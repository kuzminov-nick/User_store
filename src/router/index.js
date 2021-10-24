import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import User from '../views/User/User.vue'
import E404 from '../views/E404.vue'

const routes = [
  {
    path: '/:page',
    name: 'Home',
    component: Home,
    props: true
  },
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  {
    name: 'user',
    path: '/user/:id',
    component: User,
    props: true
  },
  {
    name: 'AddUser',
    path: '/add',
    component: User,
    props: true
  },
  {
    name: 'E404',
    path: '/:pathMatch(.*)',
    component: E404
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
