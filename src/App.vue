<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'

import LoginPage from './components/LoginPage.vue'
import Pwd from './components/Pwd.vue';
import welcome from './components/welcome.vue'
import users from './components/users.vue'
import { ref } from 'vue';
import axios from 'axios';

// Utilisation de useRouter pour accéder au router
const router = useRouter();

// Méthode pour déconnecter l'utilisateur
async function disconnect() {
    try {
        const req = await axios.post('http://localhost:3000/api/logout');

        if (req.status === 200) {
            // Supprimez les informations de l'utilisateur de sessionStorage ou autre
            sessionStorage.removeItem('user');

            // Redirigez l'utilisateur vers la page de login
            router.push('/');
        }
    } catch (error) {
        console.log('Erreur lors de la déconnexion:', error);
    }
}
</script>

<template>
    <LoginPage v-if="$route.path == '/'"/>
    <welcome v-else-if="$route.path == '/welcome'"/>
    <Pwd v-else-if="$route.path == '/pwd'" />
    <users v-else-if="$route.path == '/users'"/>
    <div v-else>
        <nav class="navbar navbar-expand-lg navbar-light ">
            <div class="container-fluid">
                <RouterLink to="/statistique"  class="navbar-brand">
                    <img src="./assets/LOGO EF.png" alt="logo" width="50" height="50" class="me-2">
                    SRSP VATOVAVY
                </RouterLink>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse ms-5" id="navbarNav">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <RouterLink to="/statistique" class="nav-link" :class="{ active: $route.path === '/statistique' }">
                                <i class="bi bi-bar-chart-line me-2"></i> Statistique
                            </RouterLink>
                        </li>
                        <li class="nav-item">
                            <RouterLink to="/agents" class="nav-link" :class="{ active: $route.path === '/agents' }">
                                <i class="bi bi-people me-2"></i> Agents de l'État
                            </RouterLink>
                        </li>
                        <li class="nav-item">
                            <RouterLink to="/bareme" class="nav-link" :class="{ active: $route.path === '/bareme' }">
                                <i class="bi bi-cash-coin me-2"></i> Bareme de solde
                            </RouterLink>
                        </li>
                        <li class="nav-item">
                            <RouterLink to="/secours" class="nav-link" :class="{ active: $route.path === '/secours' || $route.path === '/decision' }">
                                <i class="bi bi-file-earmark-text me-2"></i> Secours au décès
                            </RouterLink>
                        </li>
                    </ul>
                    <button @click="disconnect" class="btn btn-outline-danger">Déconnexion</button>
                </div>
            </div>
        </nav>

        <Transition>
            <div>  
                <RouterView />
            </div>
        </Transition>

    </div>
</template>

<style>
/* Transitions pour les vues */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
