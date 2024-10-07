<template>

<div class="container">
        <div id="title" class="text-center">
            <h2>service regional des soldes et des pensions</h2>
            <h4>Secours au deces</h4>
        </div>
        <hr>
       <div id="formulaire" class="d-flex">
            <div class=" col-5">
                <img src="../assets/Logo_hd_MEF-PETIT-2.png" alt="logo FE" width="600px">
            </div>
            <div class="col-6 shadow rounded-4 text-center">
                
                <form @submit.prevent="connect">
                    <h6 style="margin-top: 1rem;">ancien mot de passe:</h6>
                    <input v-model="oldPass" :type="showPassword ? 'text' : 'password'" :class="classname1">
                    <p class=" text-danger mt-2">{{ alert }}</p>
                    <button @click="togglePassword1" type="button" class="toggle-btn2">
                        <font-awesome-icon :icon="showPassword ? 'eye-slash' : 'eye'" />
                    </button>
                    <h6 style="margin-top: 0;">nouveau mot de passe:</h6>
                    <input v-model="newPass" :type="showPassword2 ? 'text' : 'password'" :class="classname2">

                    <button @click="togglePassword2" type="button" class="toggle-btn3">
                        <font-awesome-icon :icon="showPassword2 ? 'eye-slash' : 'eye'" />
                    </button>
                    <p class=" text-danger mt-2">{{ alert2 }}</p>
                    <h6 style="margin-top: 0;">confirmez le mot de passe:</h6>
                    <input v-model="newPass2" :type="showPassword3 ? 'text' : 'password'" :class="classname2">
                    <button @click="togglePassword3" type="button" class="toggle-btn4">
                        <font-awesome-icon :icon="showPassword3 ? 'eye-slash' : 'eye'" />
                    </button>
                    <button type="button" @click="change" class="btn btn-success mt-3">changer</button>
                    <RouterLink to="/" class="btn btn-danger mt-3 ms-4">annuler</RouterLink>
                </form>
            </div>
       </div>
    </div>

</template>

<script>
import axios from 'axios';

    export default{
        data(){
            return{
                oldPass:'',
                newPass:'',
                newPass2:'',
                alert:'',
                alert2:'',
                classname1: 'form-control',
                classname2: 'form-control',
                showPassword:false,
                showPassword2:false,
                showPassword3:false,
            }
        },
        methods: {
    togglePassword1() {
        this.showPassword = !this.showPassword;
    },
    togglePassword2() {
        this.showPassword2 = !this.showPassword2;
    },
    togglePassword3() {
        this.showPassword3 = !this.showPassword3;
    },
    async change() {
    // Vérifiez si les mots de passe sont corrects
    if (this.oldPass === '') {
        this.alert = 'Veuillez entrer votre ancien mot de passe.';
        this.classname1 = 'form-control border-danger';
        return;
    }
    
    if (this.newPass !== this.newPass2) {
        this.alert2 = 'Vous avez entré deux mots de passe différents !';
        this.classname2 = 'form-control border-danger';
        return;
    }
    
    try {
        const response = await axios.post('http://192.168.0.105:3000/api/change-password', {
            oldPass: this.oldPass,
            newPass: this.newPass
        });
        alert(response.data.message); // Affichez le message de succès
        this.$router.push({ path: '/' }); // Redirigez vers la page login après le changement
    } catch (error) {
        this.alert = error.response?.data?.message ?? 'Erreur lors du changement de mot de passe.';
        this.classname1 = 'form-control border-danger';
    }
}

}


    }
</script>


<style>
.toggle-btn2 {
  position: absolute;
  right: 20%;
  top: 40.5%;
  transform: translateY(-50%);
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: #ffffff;
}

.toggle-btn3 {
  position: absolute;
  right: 20%;
  top: 51.5%;
  transform: translateY(-50%);
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: #ffffff;
}

.toggle-btn4 {
  position: relative;
  bottom: 15px;
  left: 36%;
  transform: translateY(-50%);
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: #ffffff;
}
</style>