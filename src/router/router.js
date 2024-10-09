// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Statistique from '../components/Statistique.vue';
const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../components/LoginPage.vue')
  },

  {
    path: '/pwd',
    name: 'Password',
    component: () => import('../components/Pwd.vue')
  },

  {
    	path: '/welcome',
      name: 'bonjour',
      component: () => import('../components/welcome.vue')
  },

  {
    path: '/statistique',
    name: 'Statistique',
    component: Statistique
  },
  {
    path: '/agents',
    name: 'Agent',
    component: () => import('../components/Agents.vue')
  },

  {
    path: '/bareme',
    name: 'Bareme',
    component: () => import('../components/Bareme.vue')
  },

  {
    path: '/secours',
    name: 'Secours',
    component: () => import('../components/Secours.vue')
  },

  {
    path: '/users',
    name: 'Users',
    component: () => import('../components/users.vue')
  }

];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
