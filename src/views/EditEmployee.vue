<template>
  <div class="container">
    <Form :employee="this.employeeItem" :is-edit="true" />
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
    this.$route.params.employee
      ? (this.employeeItem = this.$route.params.employee)
      : {};
  },
};
</script>

<style scoped></style>
