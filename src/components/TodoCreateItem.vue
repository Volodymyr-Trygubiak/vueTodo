<template>
  <TodoModal :class="{ close: hidden }" @close-modal="closeCreateModal">
    <h1 class="title">Create Item</h1>
    <form @submit.prevent>
      <h4 class="title-inp">Title</h4>
      <input
        class="main-inp"
        type="text"
        v-model="newTask.title"
        :class="$v.newTask.title.$error ? 'invalid' : ''"
      />
      <p
        class="error-text"
        v-if="$v.newTask.title.$dirty && !$v.newTask.title.required"
      >
        *Required field
      </p>
      <p
        class="error-text"
        v-if="$v.newTask.title.$dirty && !$v.newTask.title.minLength"
      >
        *Length must be more 3 letters
      </p>
      <div class="df" v-else></div>
      <h4 class="title-inp">Comment</h4>
      <textarea class="main-inp area" type="text" v-model="newTask.text" />

      <div class="btn-groupe">
        <TodoButton type="submit" :title="'Create'" @click="checkForm" />
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
import { mapActions } from "vuex";

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
    ...mapActions(["POST_TASK_TO_API"]),

    checkForm() {
      this.$v.newTask.$touch();
      if (!this.$v.newTask.$error) {
        this.POST_TASK_TO_API(this.newTask);
        this.$emit("close-create-modal", this.close);
        this.newTask.title = "";
        this.newTask.text = "";
        this.$v.$reset();
      }
    },

    closeCreateModal() {
      this.newTask.title = "";
      this.newTask.text = "";
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
