<template>
  <nav class="amber">
    <div class="container">
      <div class="header-wrapper">
        <router-link to="/" class="">Home Page</router-link>
        <button
          class="btn waves-effect blue darken-4 white-text btn-medium waves-light"
          @click="logOut"
        >
          Logout
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'HeaderComponent',
  methods: {
    ...mapActions(['logout']),
    async logOut() {
      await this.logout();
      await this.$router.push('/login?message=logout');
      localStorage.removeItem('userToken');
    },
  },
};
</script>

<style scoped>
nav {
  display: flex;
  align-items: center;
}
.header-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
