<template>
  <a
    class="btn waves-effect waves-light green darken-4 white-text"
    @click="goBack"
  >
    Back to homepage
  </a>
</template>

<script>
export default {
  name: 'GoBackButton',
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped></style>
