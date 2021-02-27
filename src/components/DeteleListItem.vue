<template>
  <div
    class="modal-overlay"
    @click.self="closeDeleteModal"
    :class="hiddenDelete ? 'close' : ''"
  >
    <div class="modal-container">
      <h4 class="title">Do you want delete?</h4>
      <h5 class="item-title">{{ tasks[0].title }}</h5>

      <div class="btn-groupe">
        <button class="main-btn" @click="deleteItem">Yes</button>
        <button class="main-btn cancel" @click="closeDeleteModal">Nope</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DeleteListItem",
  props: ["hiddenDelete", "tasks", "index"],
  methods: {
    closeDeleteModal() {
      this.$emit("closeDeleteModal", this.close);
    },
    deleteItem(index) {
      this.$emit("deleteItem", index);
      this.$emit("closeDeleteModal");
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
