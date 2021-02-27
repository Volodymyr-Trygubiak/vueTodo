<template>
  <div
    class="modal-overlay"
    @click.self="closeModal"
    :class="hidden ? 'close' : ''"
  >
    <div class="modal-container">
      <h1 class="title">ToDo list</h1>
      <form @submit.prevent="checkForm">
        <h4 class="title-inp">Title</h4>
        <input
          class="main-inp"
          :class="$v.newTask.title.$error ? 'invalid' : ''"
          type="text"
          v-model="newTask.title"
        />
        <p
          v-if="$v.newTask.title.$dirty && !$v.newTask.title.required"
          class="error"
        >
          *Required field
        </p>
        <p
          v-if="$v.newTask.title.$dirty && !$v.newTask.title.minLength"
          class="error"
        >
          *Length must be more 3 letters
        </p>
        <h4 class="title-inp">Comment</h4>
        <textarea class="main-inp area" type="text" v-model="newTask.text" />

        <div class="btn-groupe">
          <button type="submit" class="main-btn" @click="checkForm">
            Create
          </button>
          <button class="main-btn cancel" @click="closeModal">Close</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";

export default {
  name: "AddNewTodo",
  props: ["hidden", "tasks"],
  data() {
    return {
      newTask: {
        id: "",
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
        this.$emit("checkForm", { ...this.newTask });
        this.$emit("closeModal", this.close);
        this.newTask.title = "";
        this.newTask.text = "";
        this.$v.newTask.title.$dirty = false;
      }
    },
    closeModal() {
      this.newTask.title = "";
      this.newTask.text = "";
      this.$emit("closeModal", this.close);
    }
  }
};
</script>

<style lang="scss" scoped>
.main-inp {
  &.area {
    height: 165px;
  }
}
input {
  &.invalid {
    border-color: #ff006a;
    &:hover {
      box-shadow: 0 0 5px 0 #ff006a;
    }

    &:focus {
      border-color: #ff006a;
      box-shadow: 0 0 10px 0 #ff006a;
    }
  }
}
.error {
  font-size: 14px;
  color: #ff006a;
  text-align: left;
  margin-left: 10px;
}

.btn-groupe {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>
