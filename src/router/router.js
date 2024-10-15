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

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!sessionStorage.getItem('user'); // Vérifiez l'authentification de l'utilisateur
  
  // Vérifiez si l'utilisateur n'est pas authentifié et tente d'accéder à une autre route que /login
  if (!isAuthenticated && to.path !== '/') {
      next('/'); // Redirigez vers /login si l'utilisateur n'est pas connecté
  } else {
      next(); // Sinon, continuez la navigation normalement
  }
});


export default router;
