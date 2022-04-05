<template>
  <nav class="white">
    <div class="row">
      <div class="nav-wrapper">
        <div class="input-field col s4">
          <i class="material-icons prefix black-text">search</i>
          <input
            placeholder="Search for employee"
            type="text"
            class="black-text"
            v-model="filteredName"
            @input="$emit('search', $event.target.value)"
          />
        </div>
        <div class="input-field col s4">
          <select v-model="select" selected>
            <option value="" disabled selected>Choose department</option>

            <option v-for="item of departmentList" :key="item" :value="item">
              {{ item }}
            </option>
          </select>
        </div>
        <div class="col s4">
          <router-link
            to="/add-new-employee"
            class="btn waves-effect waves-light blue darken-4 white-text"
          >
            Add new employee
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import M from 'materialize-css';

export default {
  name: 'NavbarComponent',
  data: () => ({
    select: '',
    filteredName: '',
  }),
  props: {
    departmentList: {
      type: Array,
      default: () => [],
    },
  },
  mounted() {
    M.updateTextFields();
  },
  watch: {
    select(val) {
      this.$emit('filter', val);
    },
  },
};
</script>

<style scoped>
nav {
  margin-top: 10px;
}
.nav-wrapper {
  display: flex;
  align-items: center;
}
</style>
