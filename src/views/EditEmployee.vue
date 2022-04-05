<template>
  <div class="container">
    <Form :employee="employeeItem" :is-edit="true" />
  </div>
</template>

<script>
import Form from '@/components/Form';

export default {
  name: 'EditEmployee',
  components: {
    Form,
  },
  data: () => ({
    employeeItem: {},
  }),
  mounted() {
    this.employeeItem = this.$route.params?.employee || {};
  },
};
</script>

<style scoped></style>
