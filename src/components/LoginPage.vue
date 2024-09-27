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
import axios from 'axios'; // Assurez-vous qu'Axios est importé

export default {
    data() {
        return {
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
                const response = await axios.post('http://localhost:3000/api/login', {
                password: this.passwordIn // Assure-toi que `passwordIn` contient bien la valeur attendue
                });

                if (response.status === 200) {
                this.$router.push({
                    path: '/welcome'
                });
                }
            } catch (error) {
                if (error.response) {
                if (error.response.status === 401) {
                    this.alert = 'Mot de passe incorrect !!';
                    this.classname = 'form-control border-danger';
                } else {
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
    position: absolute;
    right: 20%;
    top: 47.2%;
    transform: translateY(-50%);
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 18px;
    color: #ffffff;
}
</style>
