<template>
  <div id="app">
    <Header v-if="isVisible" />
    <router-view />
    <div class="overlay d-none"></div>
  </div>
</template>

<script>
import { NOT_AUTH_PAGES_NAME } from '@/helpers/constants';
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
      return !NOT_AUTH_PAGES_NAME.includes(this.$route.name);
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
