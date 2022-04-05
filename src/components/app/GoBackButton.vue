<template>
  <a
    class="btn waves-effect waves-light blue darken-4 white-text"
    @click="goBack"
  >
    Back to homepage
  </a>
</template>

<script>
export default {
  name: 'GoBackButton',
  props: {
    buttonType: {
      type: String,
      default: 'back',
    },
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped></style>
