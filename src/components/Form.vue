<template>
  <form @submit.prevent="onFormSubmit">
    <div class="card-content">
      <h5 class="card-title">{{ !isEdit ? 'Add new' : 'Edit' }} employee</h5>

      <div class="input-field">
        <input
          id="name"
          type="text"
          v-model.trim="name"
          :class="{
            invalid: $v.name.$dirty && !$v.name.required,
          }"
        />
        <label for="name">Full name</label>
        <small
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.required"
          >Name field is required!</small
        >
      </div>

      <div class="input-field">
        <select ref="select" class="d-none" v-model="department">
          <option
            v-for="department of departmentList"
            :key="department"
            :value="department"
          >
            {{ department }}
          </option>
        </select>

        <label>Department</label>
        <small
          class="helper-text invalid"
          v-if="$v.department.$dirty && !$v.department.required"
          >Department field is required!</small
        >
      </div>

      <div class="input-field">
        <textarea
          id="note"
          class="materialize-textarea"
          v-model.trim="note"
        ></textarea>
        <label for="note">Notes: </label>
      </div>
    </div>

    <div class="card-action">
      <div>
        <button
          class="btn waves-effect blue darken-4 submit-button"
          type="submit"
        >
          Save
        </button>

        <GoBackButton :class-color="'red'" />
      </div>
    </div>
  </form>
</template>

<script>
import { DEPARTMENTS_LIST } from '@/helpers/constants';
import { mapActions } from 'vuex';
import { required } from 'vuelidate/lib/validators';
import M from 'materialize-css';

export default {
  name: 'EmployeeForm',
  validations: {
    name: { required },
    department: { required },
  },
  data: () => ({
    departmentList: [],
    name: '',
    department: '',
    note: '',
    select: null,
  }),
  props: {
    employee: {
      type: Object,
      default: () => {},
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.departmentList = DEPARTMENTS_LIST;

    if (this.isEdit) {
      const { name, department, note } = this.employee;

      setTimeout(() => {
        this.name = name;
        this.department = department;
        this.note = note;
      }, 0);
    }

    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select);
      M.updateTextFields();
    }, 20);
  },
  methods: {
    ...mapActions(['updateEmployee', 'createNewEmployee']),
    async onFormSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      const id = this.isEdit
        ? this.employee.id
        : Math.floor(Math.random() * 10000);

      const formData = {
        id,
        name: this.name,
        department: this.department,
        note: this.note,
      };

      if (this.isEdit) {
        await this.updateEmployee(formData);
        this.$message('Employee info was updated!');
      } else {
        await this.createNewEmployee(formData);
        this.$message('New employee was created!');
      }

      this.$router.push('/dashboard');
    },
  },
};
</script>

<style scoped>
button[type='submit'] {
  margin-right: 15px;
}
</style>
