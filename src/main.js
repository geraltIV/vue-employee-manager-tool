import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { Vuelidate } from 'vuelidate';
import MessagePlugin from '@/utils/message.plugin';
import Preloader from '@/components/app/Preloader';
import GoBackButton from '@/components/app/GoBackButton';
import Paginate from 'vuejs-paginate';
import 'materialize-css/dist/js/materialize.min';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

Vue.config.productionTip = false;
Vue.use(Vuelidate);
Vue.use(MessagePlugin);
Vue.component('LoaderComponent', Preloader);
Vue.component('GoBackButton', GoBackButton);
Vue.component('PaginateComponent', Paginate);

firebase.initializeApp({
  apiKey: 'AIzaSyDJ_4HKp9orPe6jpSq6uC-Xxqrx1oG7R1s',
  authDomain: 'vue-employees-manager.firebaseapp.com',
  projectId: 'vue-employees-manager',
  storageBucket: 'vue-employees-manager.appspot.com',
  messagingSenderId: '901960767508',
  appId: '1:901960767508:web:c150fa819a4c1f0ae9ef01',
  measurementId: 'G-40G8BK2SGJ',
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
