<template>
  <div id="app">
    <Header v-if="isVisible" />
    <router-view />
    <div class="overlay d-none"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import messages from '@/utils/messages';
import Header from '@/components/app/Header';

export default {
  components: {
    Header,
  },
  computed: {
    ...mapGetters(['getError']),
    isVisible() {
      return (
        this.$route.name !== 'Login' && this.$route.name !== 'PageNotFound'
      );
    },
  },
  watch: {
    error(fbError) {
      this.$error(messages[fbError.code] || messages.default);
    },
  },
};
</script>

<style lang="scss">
@import '~materialize-css/dist/css/materialize.min.css';
@import 'assets/css/index.css';
</style>
