<template>
  <div class="todo-list">
    <ul v-if="filteredTasks.length > 0" class="list">
      <li class="list-item" v-for="(task, index) in filteredTasks" :key="index">
        <input
          class="checkbox"
          :class="task.completed ? 'checked' : ''"
          type="checkbox"
          @click="checkItem(index)"
        />
        <div class="text-group">
          <h4 class="item-title" :class="task.completed ? 'done' : ''">
            <span class="index">{{ `${index + 1}.` }}</span>
            {{ task.title }}
          </h4>
          <p class="item-info">{{ task.text }}</p>
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
    },
    checkItem(index) {
      this.$emit("checkItem", index);
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

.text-group {
  margin-left: 10px;
  width: 100%;
  max-width: 80%;
  text-align: left;
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
  white-space: normal;
  &::after,
  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    background-color: #ff006a;
  }
  &::before {
    width: 100%;
  }
  &::after {
    width: 0;
    background-color: #41b883;
    transition: width 0.1s ease-out;
  }
  .index {
    color: #ff006a;
  }

  &.done {
    .index {
      color: #41b883;
      transition: color 0.1s ease-in;
    }
    &.item-title::before {
      // width: 0;
      transition: width 0.1s ease-in;
    }

    &.item-title::after {
      width: 100%;
      transition: width 0.1s ease-in;
    }
  }
}
.checkbox {
  visibility: hidden;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 20px;
    border: 2px solid #41b883;
    visibility: visible;
  }
}

.checked {
  &.checkbox::after {
    content: "";
    position: absolute;
    visibility: visible;
    bottom: 40%;
    left: 5%;
    width: 20px;
    height: 10px;
    border-left: 4px solid #ff006a;
    border-bottom: 4px solid #ff006a;
    border-radius: 4px;
    transform: rotate(-45deg);
  }
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
