<template>
  <div class="container">
    <LoaderComponent v-if="loading" />

    <div v-else>
      <Navbar
        :department-list="departmentList"
        @search="search = $event"
        @filter="filter = $event"
      />
      <EmployeesTable
        :employees-list="employeesSearch"
        @deleteItem="deleteEmployee"
      />
      <PaginateComponent
        v-model="page"
        :page-count="Math.ceil(allEmployees.length / 5)"
        :click-handler="pageChangeHandler"
        :prev-text="'<'"
        :next-text="'>'"
        :container-class="'pagination'"
        :page-class="'waves-effect'"
      />
      <ConfirmationModal
        v-if="isVisible"
        :id="employeeId"
        @closeModal="closeModal"
      />
    </div>
  </div>
</template>

<script>
// const DEFAULT_DEPARTMENTS = 'All departments';
import { ITEMS_PER_PAGE, DEFAULT_DEPARTMENT } from '@/helpers/constants';
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
    this.loading = false;

    this.departmentList = this.allEmployees.reduce(
      (acc, i) => (!acc.includes(i.department) ? [...acc, i.department] : acc),
      []
    );

    this.departmentList.unshift(DEFAULT_DEPARTMENT);
    this.filter = this.departmentList[0];
  },
  computed: {
    ...mapGetters(['allEmployees']),
    employeesFiltered() {
      return [...this.allEmployees].filter((el) =>
        this.filter === DEFAULT_DEPARTMENT
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
      this.pageSize = page * ITEMS_PER_PAGE;
    },
    calculate() {
      return this.pageSize - ITEMS_PER_PAGE;
    },
  },
};
</script>

<style scoped></style>
