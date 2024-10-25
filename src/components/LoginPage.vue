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
            <div class="col-6 shadow rounded-4 text-center" 
                style="height: auto;">
                <form @submit.prevent="connect">
                    <div class="row mt-5">
                        <div class="col-3 ms-5 mt-5">
                            <label class="" for="usename">Nom d'utilisateur :</label>
                        </div>
                        <div class="col-6 mt-5">
                            <input  v-model="username" class="form-control" type="text" required>
                        </div>
                    </div>

                    <div class="row mt-5">
                        <div class="col-3 ms-5">
                            <label class="" for="password">Mot de passe :</label>
                        </div>
                        <div class="col-6">
                            <input required class="" v-model="passwordIn" :type="showPassword ? 'text' : 'password'" :class="classname" />
                        </div>
                        <div class="col-1">
                            <button @click="togglePassword" type="button" class="toggle-btn">
                                <i :class="showPassword ? 'bi bi-eye-fill' : 'bi bi-eye-slash-fill'"></i>
                            </button>
                        </div>
                    </div>
                    
                    <p class="text-danger mt-2">{{ alert }}</p>

                    <button type="submit" class="btn btn-success mt-2">Se connecter</button>
                </form>
                <h6 style="margin-top: 2rem;"><i><RouterLink to="/pwd" class="nav-link">changer le mot de passe</RouterLink></i></h6>
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
            passwordIn: '',    
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
                const response = await axios.post('http://192.168.0.10:3000/api/login', { username: this.username,
                password: this.passwordIn
                });

                //rediriger sur la page d'accueil on a la status 200
                if (response.status === 200) {
                    sessionStorage.setItem('user', JSON.stringify(response.data.user));

                    // Redirigez l'utilisateur vers la page d'accueil ou une autre route après la connexion
                    this.$router.push('/welcome');
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
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 22px;
    color: #ffffff;
}
</style>
