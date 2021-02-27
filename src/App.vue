<template>
  <div id="app">
    <div class="container">
      <img class="logo" alt="Vue logo" src="./assets/logo.png" />
    </div>
    <div class="header">
      <input
        class="main-inp"
        @input="searchText = $event.target.value"
        placeholder="Search..."
        type="text"
      />
      <button class="main-btn" @click="hidden = false">Add new todo</button>
    </div>

    <AddNewTodo
      :tasks="tasks"
      :hidden="hidden"
      @closeModal="closeModal"
      @checkForm="checkForm"
    />

    <TodoList
      :filteredTasks="filteredTasks"
      @openDeleteModal="openDeleteModal"
      @checkItem="checkItem"
    />
    <DeleteListItem
      :tasks="tasks"
      :hiddenDelete="hiddenDelete"
      @closeDeleteModal="closeDeleteModal"
      @deleteItem="deleteItem"
    />
  </div>
</template>

<script>
import AddNewTodo from "./components/AddNewTodo";
import TodoList from "./components/TodoList";
import DeleteListItem from "./components/DeteleListItem";

import CloseModal from "./mixins/closeModal";
export default {
  name: "App",
  components: {
    AddNewTodo,
    TodoList,
    DeleteListItem
  },
  mixins: [CloseModal],
  data() {
    return {
      tasks: [
        {
          id: 1,
          title: "Vue",
          text: "Learn vue",
          completed: true,
        },
        {
          id: 2,
          title: "Angular",
          text: "Learn Angular",
          completed: false,
        },
        {
          id: 3,
          title: "Html",
          text: "Learn html",
          completed: true,
        },
        {
          id: 4,
          title: "Scss",
          text: "Learn scss",
          completed: true,
        },
        {
          id: 5,
          title: "Vuex",
          text: "Learn Vuex",
          completed: false,
        },
        {
          id: 5,
          title: "Ham",
          text: "Learn Vuex",
          completed: false,
        },
        {
          id: 6,
          title: "React",
          text: "Learn react",
          completed: false,
        },
      ],
      searchText: "",
      hidden: true,
      hiddenDelete: true
    };
  },
  computed: {
    filteredTasks() {
      return this.tasks.filter(task =>
        task.title.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  },
  methods: {
    closeModal() {
      return (this.hidden = true);
    },
    checkForm(newTask) {
      return this.tasks.push(newTask);
    },
    openDeleteModal() {
      return (this.hiddenDelete = false);
    },
    closeDeleteModal() {
      return (this.hiddenDelete = true);
    },
    deleteItem(index) {
      this.tasks.splice(index, 1);
    },
    checkItem(index) {
      // this.$set(this.tasks[index], "completed", !this.tasks[index].completed);
      this.tasks[index].completed = !this.tasks[index].completed;
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
.container {
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
  }
  .main-btn {
    white-space: nowrap;
    margin-left: 20px;
  }
}

.title {
  display: inline-block;
  font-size: 36px;
  margin: 20px 0;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #41b883;
  }
}

.title-inp {
  font-size: 20px;
  margin-top: 15px;
  margin-bottom: 10px;
  text-align: left;
}
</style>
