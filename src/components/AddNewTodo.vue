<template>
  <div
    class="modal-overlay"
    @click.self="closeModal"
    :class="hidden ? 'close' : ''"
  >
    <div class="modal-container">
      <h1 class="title">ToDo list</h1>
      <form @submit.prevent>
        <h4 class="title-inp">Title</h4>
        <input class="main-inp" type="text" v-model="newTask.title" />
        <h4 class="title-inp">Comment</h4>
        <textarea class="main-inp area" type="text" v-model="newTask.text" />

        <div class="btns">
          <button type="submit" class="main-btn" @click="addTask">
            Create
          </button>
          <button class="main-btn cancel" @click="closeModal">Close</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddNewTodo",
  props: ["hidden"],
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
  methods: {
    closeModal() {
      this.newTask.title = "";
      this.newTask.text = "";
      this.$emit("closeModal", this.close);
    },
    addTask() {
      this.$emit("addTask", { ...this.newTask });
      this.$emit("closeModal", this.close);
      this.newTask.title = "";
      this.newTask.text = "";
    }
  }
};
</script>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
}

.modal-container {
  width: 600px;
  margin: 0 auto;
  padding: 15px;
  box-shadow: 0 0 10px 1px #41b883;
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%);
  background-color: rgb(17, 17, 17);
  background-image: url(../assets/4k-ultra-hd-background-nebula-sparkles-shine-dark-abstractio.jpg);
}

.main-inp {
  &.area {
    height: 165px;
  }
}

.btns {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
.close {
  display: none;
}
</style>
