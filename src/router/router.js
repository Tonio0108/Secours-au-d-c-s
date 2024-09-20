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
    path: '/decision',
    name: 'Decision',
    component: () => import('../components/decision.vue')
  },

  {
    path: '/impression',
    name: 'Impression',
    component: () => import('../components/impression.vue')
  },

];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
