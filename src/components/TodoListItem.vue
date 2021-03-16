<template>
  <li class="list-item">
    <input
      class="checkbox"
      type="checkbox"
      :class="task.completed ? 'checked' : ''"
      @click="checkItem"
    />
    <div class="text-group">
      <h4 class="item-title" :class="task.completed ? 'done' : ''">
        <span class="index">{{ `${index + 1}.` }}</span>
        {{ task.title }}
      </h4>
      <p class="item-info">{{ task.text }}</p>
    </div>

    <TodoButton
      class="item-btn"
      :title="'Delete'"
      :cancel="true"
      @click="openDeleteModal(index)"
    />
  </li>
</template>

<script>
import TodoButton from "./shared/TodoButton";

export default {
  name: "TodoListItem",

  components: {
    TodoButton
  },

  props: {
    task: {
      type: Object,
      default() {
        return {};
      }
    },
    index: {
      type: Number
    }
  },

  methods: {
    openDeleteModal() {
      this.$emit("open-delete-modal", this.task);
    },
    checkItem() {
      this.$emit("check-item", this.index);
    }
  }
};
</script>

<style lang="scss" scoped>
.list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  margin: 15px;
  box-shadow: 0 0 5px 2px #41b883;
  background-image: url(../assets/4k-ultra-hd-background-nebula-sparkles-shine-dark-abstractio.jpg);
}

.text-group {
  margin-left: 10px;
  width: 100%;
  max-width: 80%;
  text-align: left;
}

.item-info {
  color: #3f5e80;
}

.title-empty {
  padding: 10px;
}
.item-btn {
  padding: 10px 20px;
}
</style>
