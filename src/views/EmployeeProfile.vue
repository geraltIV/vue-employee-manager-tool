<template>
  <div class="container">
    <div class="card">
      <div class="card-content black-text">
        <blockquote>Department:</blockquote>
        <p>{{ this.department }}</p>

        <blockquote>Full name:</blockquote>
        <p>{{ this.fullName }}</p>

        <blockquote>Notes:</blockquote>
        <p>{{ this.note }}</p>

        <GoBackButton />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'EmployeeProfilePage',
  data: () => ({
    fullName: '',
    department: '',
    note: '',
    id: '',
  }),
  mounted() {
    this.fullName = this.$route.params.name;
    this.department = this.$route.params.department;
    this.note = this.$route.params.note;
    this.id = this.$route.params.id;
  },
  computed: {
    ...mapGetters({ allEmployees: 'allEmployees' }),
  },
};
</script>

<style scoped></style>
