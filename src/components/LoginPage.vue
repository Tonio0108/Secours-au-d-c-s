<template>
    <div class="container">
        <div id="title" class="text-center">
            <h2>Service régional des soldes et des pensions</h2>
            <h4>Secours au décès</h4>
        </div>
        <hr>
        <div id="formulaire" class="d-flex">
            <div class="col-5">
                <img src="../assets/Logo_hd_MEF-PETIT-2.png" alt="logo FE" width="600px" />
            </div>
            <div class="col-6 shadow rounded-4 text-center">
                <h6 style="margin-top: 5rem;">Veuillez saisir le mot de passe :</h6>
                <form @submit.prevent="connect">
                    <input v-model="passwordIn" :type="showPassword ? 'text' : 'password'" :class="classname" />
                    <p class="text-danger mt-2">{{ alert }}</p>
                    <button @click="togglePassword" type="button" class="toggle-btn">
                        <font-awesome-icon :icon="showPassword ? 'eye-slash' : 'eye'" />
                    </button>
                    <button type="submit" class="btn btn-success mt-2">Entrer</button>
                </form>
                <h6 style="margin-top: 2rem;"><i><RouterLink to="/pwd" class="nav-link">changer le mot de passe</RouterLink></i></h6>
                <h6 style="margin-top: 1.5rem;"><i><a href="" class="nav-link text-danger">mot de passe oublié</a></i></h6>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'; 

export default {
    data() {
        return {
            passwordIn: '',     //variable pour stocker le mot de passe saisi
            alert: '',
            classname: 'form-control',
            showPassword: false
        };
    },
    methods: {
        togglePassword() {
            this.showPassword = !this.showPassword;
        },
        async connect() {
            try {
                //recuperation du mot de passe dans la base de donnée et comparaison entre le mdp saisi
                const response = await axios.post('http://192.168.0.105:3000/api/login', {
                password: this.passwordIn
                });

                //rediriger sur la page d'accueil on a la status 200
                if (response.status === 200) {
                this.$router.push({
                    path: '/welcome'
                });
                }
            } catch (error) {
                if (error.response) {
                    // si le mot da passe est incorrect
                if (error.response.status === 401) {
                    this.classname = 'form-control border-danger';
                } else {
                    // si le serveur ne repond pas
                    this.alert = 'Erreur serveur, réessayez plus tard.';
                    this.classname = 'form-control border-danger';
                }
                } else {
                this.alert = 'Erreur de connexion.';
                this.classname = 'form-control border-danger';
                }
            }
        }

    }
};
</script>

<style>
.toggle-btn {
    position: relative;
    left: 11rem;
    bottom: 2.6rem;
    transform: translateY(-50%);
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 18px;
    color: #ffffff;
}
</style>
