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
    departmentList: ['Development', 'Management', 'QA', 'BA', 'SRE'],
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
    setTimeout(() => {
      this.name = !this.isEdit ? '' : this.employee.name;
      this.department = !this.isEdit ? '' : this.employee.department;
      this.note = !this.isEdit ? '' : this.employee.note;
    }, 0);

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
        await this.$message('Employee info was updated!');
      }

      if (!this.isEdit) {
        await this.createNewEmployee(formData);
        await this.$message('New employee was created!');
      }

      await this.$router.push('/dashboard');
    },
  },
};
</script>

<style scoped>
button[type='submit'] {
  margin-right: 15px;
}
</style>
