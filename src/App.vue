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
    <div v-else id="container">
        <div class="grid-item">
            <div class="sideBar">
                <div id="header" class="d-flex ms-3">
                    <img id="logo" src="./assets/LOGO EF.png" alt="logo" width="100px" height="100px">
                    <div class="mt-4 ms-3">
                        <h4>SRSP VATOVAVY</h4>
                        <h6>SECOURS AU DECES</h6>
                    </div>
                </div>
                <hr style="color: aliceblue;">
                <div id="sidebar" class="text-center">
                    <ul class="list-unstyled components mb-5">
                        <li :class="{ active: $route.path === '/statistique' }">
                            <RouterLink to="/statistique" class="nav-link">
                                <img src="../../../../../ICONS/dashboard (1).png" alt="dash" class="shadow"> Statistique
                            </RouterLink>
                        </li>
                        <li :class="{ active: $route.path === '/agents' }">
                            <RouterLink to="/agents" class="nav-link">
                                <img src="../../../../../ICONS/group.png" alt="agent" class="shadow me-3"> Agents de l'Etat
                            </RouterLink>
                        </li>
                        <li :class="{ active: $route.path === '/bareme' }">
                            <RouterLink to="/bareme" class="nav-link">
                                <img src="../../../../../ICONS/sold-out (2).png" alt="bareme" class="shadow me-3"> Bareme de solde
                            </RouterLink>
                        </li>
                        <li :class="{ active: $route.path === '/secours' || $route.path === '/decision' }">
                            <RouterLink to="/secours" class="nav-link">
                                <img src="../../../../../ICONS/documents.png" alt="secours" class="shadow me-3"> Secours au décès
                            </RouterLink>
                        </li>
                    </ul>
                    <button @click="disconnect" id="disconnect" class="nav-link mx-auto">Déconnexion</button>
                </div>
            </div>
        </div>
        <div class="grid-item" id="content" style="width: 100%;">  
            <RouterView />
        </div>
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
