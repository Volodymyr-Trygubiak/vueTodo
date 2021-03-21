<template>
  <div class="todo-list">
    <ul class="list" v-if="filteredTasks.length">
      <TodoListItem
        v-for="(task, index) in filteredTasks"
        :key="task.id"
        :index="index"
        :task="task"
        @open-delete-modal="openDeleteModal"
        @check-item="checkItem"
      />
    </ul>
    <h4 class="title-empty" v-else>Todo list is empty</h4>
  </div>
</template>

<script>
import TodoListItem from "./TodoListItem";

export default {
  name: "TodoList",

  components: {
    TodoListItem
  },

  props: {
    filteredTasks: {
      type: Array,
      default() {
        return [];
      }
    }
  },

  methods: {
    openDeleteModal(task) {
      this.$emit("open-delete-modal", task);
    },
    checkItem(index) {
      this.$emit("check-item", index);
    }
  }
};
</script>

<style lang="scss" scoped>
.todo-list {
  max-width: 900px;
  margin: 0 auto;
  border: 2px solid #41b883;
}

input {
  width: 20px;
  height: 20px;
  margin-bottom: 0;
  cursor: pointer;
}

.title-empty {
  margin: 20px 20px 30px;
}
</style>
