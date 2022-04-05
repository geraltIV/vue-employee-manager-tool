import firebase from 'firebase/app';

export default {
  actions: {
    async login({ dispatch, commit }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        dispatch('getUid');
      } catch (error) {
        commit('setError', error);
      }
    },
    async logout({ commit }) {
      await firebase.auth().signOut();
      await commit('clearAllEmployees');
    },
    async getUid() {
      const user = await firebase.auth().currentUser;
      localStorage.setItem('userToken', user.uid);
    },
  },
};
