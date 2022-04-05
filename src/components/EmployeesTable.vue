<template>
  <div class="col s12 m6 l8">
    <div class="card">
      <div class="card-content black-text">
        <table v-if="employeesList.length">
          <thead>
            <tr>
              <th>#</th>
              <th>Employee</th>
              <th>Department</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="employee in employeesList"
              :key="employee.id"
              @click="goToEmployeeProfile(employee)"
              class="pointer"
            >
              <td>{{ employee.id }}</td>
              <td :class="{ active: employee.name.length }">
                <p>{{ employee.name }}</p>
              </td>
              <td>{{ employee.department }}</td>
              <td>
                <button
                  class="btn waves-effect waves-light blue darken-4 white-text"
                  @click.stop="editEmployee(employee)"
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  class="btn waves-effect waves-light red accent-4 white-text"
                  @click.stop="deleteEmployee(employee.id)"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <p v-else class="center">There is no employees...</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmployeesTableComponent',
  props: {
    employeesList: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    goToEmployeeProfile(employeeData) {
      this.$router.push({
        name: 'EmployeeProfile',
        params: employeeData,
      });
    },
    editEmployee(employee) {
      this.$router.push({ name: 'EditEmployee', params: { employee } });
    },
    deleteEmployee(employee) {
      this.$emit('deleteItem', employee);
    },
  },
};
</script>

<style scoped></style>
