import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import { useMainStore } from '@/stores'


const routes = [
  {
    path: '/:id?',
    name: 'home',
    component: Home,
    props:true,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {

  if (to.meta.requiresAuth && !useMainStore().loggedIn) {
    next('/login');
  } else if (to.name=='login' && useMainStore().loggedIn) {
    next('/');
   } else {
    next();
  }
});
export default router
