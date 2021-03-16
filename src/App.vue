<template>
  <div id="app">
    <div class="wrapper">
      <img class="logo" alt="Vue logo" src="./assets/logo.png" />
    </div>

    <div class="container">
      <div class="header">
        <input
          class="main-inp"
          placeholder="Search..."
          type="text"
          v-model="searchText"
        />
        <TodoButton :title="'Add new todo'" @click="openCreateModal" />
      </div>

      <TodoCreateItem
        :tasks="tasks"
        :hidden="hidden"
        @close-create-modal="closeCreateModal"
        @check-form="checkForm"
      />

      <TodoList
        :filtered-tasks="filteredTasks"
        @open-delete-modal="openDeleteModal"
        @check-item="checkItem"
      />

      <TodoDeteleItem
        :filtered-tasks="filteredTasks"
        :task-index="taskIndex"
        :hidden-delete="hiddenDelete"
        @close-delete-modal="closeDeleteModal"
        @delete-item="deleteItem(taskIndex)"
      />
    </div>
  </div>
</template>

<script>
import TodoButton from "./components/shared/TodoButton";

import TodoCreateItem from "./components/TodoCreateItem";
import TodoList from "./components/TodoList";
import TodoDeteleItem from "./components/TodoDeteleItem";

import { mapActions, mapGetters } from "vuex";

export default {
  name: "App",

  components: {
    TodoButton,
    TodoCreateItem,
    TodoList,
    TodoDeteleItem
  },

  data() {
    return {
      searchText: "",
      hidden: true,
      hiddenDelete: true,
      taskIndex: null
    };
  },

  computed: {
    ...mapGetters({
      tasks: "TASKS"
    }),

    filteredTasks() {
      return this.tasks.filter(task =>
        task.title.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  },

  mounted() {
    this.GET_TASKS_FROM_API();
  },

  methods: {
    ...mapActions(["GET_TASKS_FROM_API"]),

    openCreateModal() {
      this.hidden = false;
      this.searchText = "";
    },

    closeCreateModal() {
      return (this.hidden = true);
    },

    checkForm(newTask) {
      return this.tasks.push(newTask);
    },

    openDeleteModal(task) {
      this.taskIndex = task.id;
      console.log(task.id);
      return (this.hiddenDelete = false);
    },

    closeDeleteModal() {
      return (this.hiddenDelete = true);
    },

    deleteItem(index) {
      this.taskIndex = 0;
      this.tasks.splice(index, 1);
    },

    checkItem(index) {
      this.filteredTasks[index].completed = !this.filteredTasks[index]
        .completed;
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 80px;
  margin: 0 auto;
  position: relative;
}
.wrapper {
  padding-bottom: 20px;
  background-image: url(./assets/4k-ultra-hd-background-nebula-sparkles-shine-dark-abstractio.jpg);
}
.logo {
  display: block;
  margin: 0 auto;
}

.header {
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 800px;
  margin: 20px auto;
  .main-inp {
    margin-bottom: 0;
    background-color: #111111;
  }
  .btn {
    white-space: nowrap;
    margin-left: 20px;
  }
}
</style>
