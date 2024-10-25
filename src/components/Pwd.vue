<template>
    <div class="container">
        <div id="title" class="text-center">
            <h2>Service régional des soldes et des pensions</h2>
            <h4>Secours au décès</h4>
        </div>
        <hr>
        <div id="formulaire" class="d-flex">
            <div class="col-5">
                <img src="../assets/Logo_hd_MEF-PETIT-2.png" alt="logo FE" width="600px">
            </div>
            <div class="col-6 shadow rounded-4 text-center" style="height: auto;">
                <form @submit.prevent="change">
                    <div class="row mt-5">
                        <div class="col-3 ms-5">
                            <label for="username">Nom d'utilisateur :</label>
                        </div>
                        <div class="col-6">
                            <input v-model="username" :class="classname" type="text" required>
                        </div>
                    </div>

                    <div class="row mt-5">
                        <div class="col-3 ms-5">
                            <label for="password">Ancien mot de passe :</label>
                        </div>
                        <div class="col-6">
                            <input required class="form-control" v-model="oldPass" :type="showPassword ? 'text' : 'password'" :class="classname1" />
                        </div>
                        <div class="col-1">
                            <button @click="togglePassword1" type="button" class="toggle-btn">
                                <i :class="showPassword ? 'bi bi-eye-fill' : 'bi bi-eye-slash-fill'"></i>
                            </button>
                        </div>
                    </div>

                    <div class="row mt-5">
                        <div class="col-3 ms-5">
                            <label for="password">Nouveau mot de passe :</label>
                        </div>
                        <div class="col-6">
                            <input required class="form-control" v-model="newPass" :type="showPassword ? 'text' : 'password'" :class="classname2" />
                        </div>
                    </div>

                    <div class="row mt-5">
                        <div class="col-3 ms-5">
                            <label for="password">Confirmez le mot de passe :</label>
                        </div>
                        <div class="col-6">
                            <input required v-model="newPass2" :type="showPassword ? 'text' : 'password'" :class="classname2" />
                        </div>
                    </div>

                    <p class="text-danger mt-2">{{ alert }}</p>

                    <div v-if="isLoading" class="spinner-border text-primary mt-3" role="status">
                        <span class="visually-hidden">Chargement...</span>
                    </div>

                    <button type="button" @click="change" :disabled="isLoading" class="btn btn-success mt-3 mb-4">
                        {{ isLoading ? 'Chargement...' : 'Changer' }}
                    </button>
                    <RouterLink to="/" class="btn btn-danger mt-3 ms-4 mb-4" :disabled="isLoading">Annuler</RouterLink>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            username: '',
            oldPass: '',
            newPass: '',
            newPass2: '',
            alert: '',
            classname: 'form-control',
            classname1: 'form-control',
            classname2: 'form-control',
            showPassword: false,
            isLoading: false
        };
    },
    methods: {
        togglePassword1() {
            this.showPassword = !this.showPassword;
        },

        async change() {
            this.alert = '';
            this.classname1 = 'form-control';
            this.classname2 = 'form-control';

            if (this.username === '') {
                this.alert = 'Veuillez entrer votre nom d\'utilisateur';
                this.classname = 'form-control border-danger';
                return;
            }
            if (this.oldPass === '') {
                this.alert = 'Veuillez entrer votre ancien mot de passe.';
                this.classname1 = 'form-control border-danger';
                return;
            }
            if (this.newPass.length < 8) {
                this.alert = 'Le nouveau mot de passe doit comporter au moins 8 caractères.';
                this.classname2 = 'form-control border-danger';
                return;
            }
            if (this.newPass !== this.newPass2) {
                this.alert = 'Vous avez entré deux mots de passe différents !';
                this.classname2 = 'form-control border-danger';
                return;
            }

            try {
                this.isLoading = true;
                const response = await axios.post('http://192.168.0.10:3000/api/change-password', {
                    username: this.username,
                    oldPass: this.oldPass,
                    newPass: this.newPass
                });
                alert(response.data.message);
                this.$router.push({ path: '/' });
            } catch (error) {
                this.alert = error.response?.data?.message ?? 'Erreur lors du changement de mot de passe.';
                this.classname1 = 'form-control border-danger';
            } finally {
                this.isLoading = false;
                this.oldPass = '';
                this.newPass = '';
                this.newPass2 = '';
            }
        }
    }
};
</script>

<style scoped>
/* Styles pour les boutons d'affichage de mot de passe */
.toggle-btn {
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 18px;
    color: #000;
}
</style>
