<template>
  <div class="todo-list">
    <ul v-if="filteredTasks.length > 0" class="list">
      <li class="list-item" v-for="(task, index) in filteredTasks" :key="index">
        <div class="content-group">
          <input class="checkbox" type="checkbox" />
          <div class="text-group">
            <h4 class="item-title">
              <span class="index">{{ `${index + 1}.` }}</span> {{ task.title }}
            </h4>
            <p class="item-info">{{ task.text }}</p>
          </div>
        </div>
        <button class="main-btn cancel item-btn" @click="deleteItem(index)">
          Delete
        </button>
      </li>
    </ul>
    <h4 class="title-empty" v-else>Todo list is empty</h4>
  </div>
</template>

<script>
export default {
  name: "TodoList",
  props: ["filteredTasks"],
  methods: {
    deleteItem(index) {
      this.$emit("deleteItem", index);
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
.list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  margin: 10px;
  box-shadow: 0 0 5px 2px #41b883;
  background-image: url(../assets/4k-ultra-hd-background-nebula-sparkles-shine-dark-abstractio.jpg);
}
input {
  width: 20px;
  height: 20px;
  margin-bottom: 0;
  cursor: pointer;
}

.item-title,
.title-empty {
  display: inline-block;
  font-size: 24px;
  position: relative;
  margin-bottom: 10px;
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
.checkbox {
  overflow: hidden;
  border: 2px solid #41b883;
}
.index {
  color: #41b883;
}

.item-info {
  color: #3f5e80;
}
.content-group {
  display: flex;
  align-items: center;
  width: 100%;
  text-align: left;
}
.text-group {
  margin-left: 20px;
}
.title-empty {
  padding: 10px;
}
.item-btn {
  padding: 10px 20px;
}
</style>
