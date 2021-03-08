<template>
  <button class="btn" :class="className" @click="click">
    {{ title }}
  </button>
</template>

<script>
export default {
  name: "TodoButton",

  props: {
    title: {
      type: String,
      default: "Press"
    },
    cancel: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    className() {
      return {
        cancel: this.cancel
      };
    }
  },
  methods: {
    click() {
      this.$emit("click");
    }
  }
};
</script>

<style lang="scss" scoped></style>
