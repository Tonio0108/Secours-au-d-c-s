<script setup>
  import { RouterLink, RouterView } from 'vue-router'

  import LoginPage from './components/LoginPage.vue'
  import Pwd from './components/Pwd.vue';
</script>

<template>

    <LoginPage v-if="$route.path == '/'"/>

    <div v-else id="container">
      <div  class="grid-item">
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
        </div>
      </div>
    </div>

    <!-- Contenu principal -->
    <div class="grid-item" id="content" style="width: 100%;">
      <RouterView />
    </div>

    </div>
  
</template>
