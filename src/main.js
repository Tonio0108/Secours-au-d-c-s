import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/router'
import bootstrap from 'bootstrap/dist/js/bootstrap'
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css'
// Import de FontAwesome et des icônes nécessaires
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; // Importer les icônes spécifiques
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Ajouter les icônes à la bibliothèque
library.add(faEye, faEyeSlash);

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon);

app.use(router)

app.mount('#app')