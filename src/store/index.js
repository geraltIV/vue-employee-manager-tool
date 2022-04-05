import Vue from 'vue';
import Vuex from 'vuex';
import auth from '@/store/auth';
import employees from '@/store/employees';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    error: null,
  },
  getters: {
    getError: (state) => state.error,
  },
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    clearError(state) {
      state.error = null;
    },
  },
  actions: {},
  modules: {
    auth,
    employees,
  },
});
