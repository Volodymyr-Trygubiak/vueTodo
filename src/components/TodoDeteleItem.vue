<template>
  <TodoModal :class="{ close: hiddenDelete }" @close-modal="closeDeleteModal">
    <h4 class="title">Do you want delete?</h4>
    <h5 class="item-title" v-if="!hiddenDelete">
      {{ taskItem.title }}
    </h5>

    <div class="btn-groupe">
      <TodoButton :title="'Yes'" @click="deleteItem" />
      <TodoButton :title="'Nope'" :cancel="true" @click="closeDeleteModal" />
    </div>
  </TodoModal>
</template>

<script>
import TodoButton from "./shared/TodoButton";
import TodoModal from "./shared/TodoModal";

export default {
  name: "TodoDeteleItem",

  components: {
    TodoButton,
    TodoModal
  },

  props: {
    hiddenDelete: {
      type: Boolean
    },

    taskItem: {
      type: Object,
      default: () => {}
    }
  },

  methods: {
    closeDeleteModal() {
      this.$emit("close-delete-modal", this.close);
    },

    deleteItem() {
      this.$emit("delete-item", this.taskItem.id);
      this.$emit("close-delete-modal");
    }
  }
};
</script>

<style lang="scss" scoped>
.btn-groupe {
  display: flex;
  justify-content: center;
  margin: 40px;
  :first-child {
    margin-right: 20px;
  }
}
.item-title {
  display: flex;
  justify-content: center;
  position: relative;
  font-size: 24px;
  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 20%;
    height: 2px;
    background-color: #ff006a;
  }
}
</style>
