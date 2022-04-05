import firebase from 'firebase/app';

export default {
  state: {
    employees: [],
  },
  mutations: {
    setAllEmployees(state, info) {
      state.employees = info;
    },
    clearAllEmployees(state) {
      state.employees = [];
    },
  },
  actions: {
    async retrieveAllEmployees({ commit }) {
      try {
        await firebase
          .database()
          .ref('/employees')
          .on('value', (data) => {
            const info = data.val();

            const employees = Object.keys(info).map((key) => ({
              ...info[key],
              id: key,
            }));
            commit('setAllEmployees', employees);
          });
      } catch (e) {
        commit('setError', e);
        throw new Error(e);
      }
    },
    async createNewEmployee({ commit }, { id, name, department, note }) {
      try {
        await firebase.database().ref(`/employees/${id}`).set({
          name,
          department,
          note,
        });
      } catch (e) {
        commit('setError', e);
        throw new Error(e);
      }
    },
    async updateEmployee({ dispatch, commit }, { id, name, department, note }) {
      try {
        await firebase
          .database()
          .ref(`/employees`)
          .child(id)
          .update({ name, department, note });
        dispatch('retrieveAllEmployees');
      } catch (e) {
        commit('setError', e);
        throw new Error(e);
      }
    },
    async deleteEmployee({ commit }, { id }) {
      try {
        await firebase.database().ref(`/employees/`).child(id).remove();
      } catch (e) {
        commit('setError', e);
        throw new Error(e);
      }
    },
  },
  getters: {
    allEmployees: (state) => {
      return Object.values(state.employees);
    },
  },
};
