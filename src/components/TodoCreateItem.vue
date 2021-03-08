<template>
  <TodoModal :class="{ close: hidden }" @close-modal="closeCreateModal">
    <h1 class="title">ToDo list</h1>
    <form @submit.prevent="checkForm">
      <h4 class="title-inp">Title</h4>
      <input
        class="main-inp"
        type="text"
        v-model="newTask.title"
        :class="$v.newTask.title.$error ? 'invalid' : ''"
      />
      <p
        class="error"
        v-if="$v.newTask.title.$dirty && !$v.newTask.title.required"
      >
        *Required field
      </p>
      <p
        class="error"
        v-if="$v.newTask.title.$dirty && !$v.newTask.title.minLength"
      >
        *Length must be more 3 letters
      </p>
      <div class="df" v-else></div>
      <h4 class="title-inp">Comment</h4>
      <textarea class="main-inp area" type="text" v-model="newTask.text" />

      <div class="btn-groupe">
        <TodoButton type="submit" :title="'Create'" />
        <TodoButton :title="'Close'" :cancel="true" @click="closeCreateModal" />
      </div>
    </form>
  </TodoModal>
</template>

<script>
import TodoButton from "./shared/TodoButton";
import TodoModal from "./shared/TodoModal";

import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";

export default {
  name: "TodoCreateItem",

  components: {
    TodoButton,
    TodoModal
  },

  props: {
    hidden: {
      type: Boolean,
      default: true
    },
    tasks: {
      type: Array,
      defaulet: []
    }
  },

  data() {
    return {
      newTask: {
        id: null,
        title: "",
        text: "",
        completed: false
      }
    };
  },

  mixins: [validationMixin],

  validations: {
    newTask: {
      title: { required, minLength: minLength(3) }
    }
  },

  methods: {
    checkForm() {
      this.$v.newTask.$touch();
      if (!this.$v.newTask.$error) {
        if (this.tasks.length) {
          this.newTask.id = Math.max(...this.tasks.map(item => item.id)) + 1;
        } else {
          this.newTask.id = 0;
        }

        this.$emit("check-form", { ...this.newTask });
        this.$emit("close-create-modal", this.close);
        console.log(this.tasks.map(item => item.id));
        this.newTask.title = "";
        this.newTask.text = "";
        this.$v.$reset();
      }
    },

    closeCreateModal() {
      this.$emit("close-create-modal", this.close);

      this.$v.$reset();
    }
  }
};
</script>

<style lang="scss" scoped>
.btn-groupe {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>
