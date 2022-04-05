<template>
  <div class="container">
    <LoaderComponent v-if="loading" />

    <div v-else>
      <Navbar
        @search="search = $event"
        @filter="filter = $event"
        :department-list="this.departmentList"
      />
      <EmployeesTable
        :employees-list="employeesSearch"
        @deleteItem="deleteEmployee"
      />
      <PaginateComponent
        v-model="page"
        :page-count="Math.ceil(this.allEmployees.length / 5)"
        :click-handler="pageChangeHandler"
        :prev-text="'<'"
        :next-text="'>'"
        :container-class="'pagination'"
        :page-class="'waves-effect'"
      />
      <ConfirmationModal
        :id="this.employeeId"
        @closeModal="closeModal"
        v-if="isVisible"
      />
    </div>
  </div>
</template>

<script>
const DEFAULT_DEPARTMENTS = 'All departments';
import { mapGetters, mapActions } from 'vuex';
import Navbar from '@/components/app/Navbar';
import EmployeesTable from '@/components/EmployeesTable';
import ConfirmationModal from '@/components/modals/ConfirmationModal';

export default {
  name: 'DashboardPage',
  data: () => ({
    employeeId: '',
    loading: true,
    isVisible: false,
    modal: null,
    search: '',
    filter: '',
    departmentList: [],
    page: 0,
    pageSize: 5,
  }),
  components: {
    Navbar,
    EmployeesTable,
    ConfirmationModal,
  },
  async mounted() {
    await this.retrieveAllEmployees();

    this.departmentList = this.allEmployees.reduce(
      (acc, i) => (!acc.includes(i.department) ? [...acc, i.department] : acc),
      []
    );

    this.departmentList.unshift(DEFAULT_DEPARTMENTS);

    this.loading = false;

    this.filter = this.departmentList[0];
  },
  computed: {
    ...mapGetters(['allEmployees']),
    employeesFiltered() {
      return [...this.allEmployees].filter((el) =>
        this.filter === DEFAULT_DEPARTMENTS
          ? el.department
          : el.department === this.filter
      );
    },
    employeesSearch() {
      return this.employeesFiltered
        .filter((el) =>
          this.search ? el.name.includes(this.search) : this.employeesFiltered
        )
        .slice(this.calculate(), this.pageSize);
    },
  },
  methods: {
    ...mapActions(['retrieveAllEmployees']),
    deleteEmployee(data) {
      this.employeeId = data;
      this.isVisible = true;
      document.body.querySelector('.overlay').classList.remove('d-none');
    },
    closeModal() {
      this.isVisible = !this.isVisible;
    },
    pageChangeHandler(page) {
      this.page = page;
      this.pageSize = page * 5;
    },
    calculate() {
      return this.pageSize - 5;
    },
  },
};
</script>

<style scoped></style>
