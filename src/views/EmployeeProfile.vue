<template>
  <div class="container">
    <div class="card">
      <span class="card-title">Employee #{{ id }} profile</span>
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
export default {
  name: 'EmployeeProfilePage',
  data: () => ({
    fullName: '',
    department: '',
    note: '',
    id: '',
  }),
  mounted() {
    const { name, department, note, id } = (this.fullName = this.$route.params);

    this.fullName = name;
    this.department = department;
    this.note = note;
    this.id = id;
  },
};
</script>

<style scoped>
.btn {
  margin-top: 24px;
}
</style>
