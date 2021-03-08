<template>
  <div class="modal-overlay" @click.self="closeModal">
    <div class="modal-container">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TodoModal",

  methods: {
    closeModal() {
      this.$emit("close-modal");
    }
  }
};
</script>
