import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: {
      name: 'Dashboard',
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login'),
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    meta: { auth: true },
    component: () => import('../views/Dashboard'),
  },
  {
    path: '/employee-profile',
    name: 'EmployeeProfile',
    meta: { auth: true },
    component: () => import('../views/EmployeeProfile'),
    props: true,
  },
  {
    path: '/add-new-employee',
    name: 'NewEmployeePage',
    meta: { auth: true },
    component: () => import('../views/NewEmployeePage'),
  },
  {
    path: '/edit-employee',
    name: 'EditEmployee',
    meta: { auth: true },
    component: () => import('../views/EditEmployee'),
    props: true,
  },
  {
    path: '/error',
    name: 'PageNotFound',
    component: () => import('../views/PageNotFound'),
  },
  {
    path: '*',
    redirect: '/error',
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const currenUser = localStorage.getItem('userToken');
  const requireAuth = to.matched.some((record) => record.meta.auth);

  if (requireAuth && !currenUser) {
    next('/login?message=login');
  } else {
    next();
  }
});
export default router;
