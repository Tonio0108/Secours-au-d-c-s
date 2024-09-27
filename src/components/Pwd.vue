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
                    <input v-model="oldPass" :type="showPassword ? 'text' : 'password'" :class="classname">
                    <p class=" text-danger mt-2">{{ alert }}</p>
                    <button @click="togglePassword1" type="button" class="toggle-btn2">
                        <font-awesome-icon :icon="showPassword ? 'eye-slash' : 'eye'" />
                    </button>
                    <h6 style="margin-top: 0;">nouveau mot de passe:</h6>
                    <input v-model="newPass" :type="showPassword2 ? 'text' : 'password'" :class="classname">
                    <p class=" text-danger mt-2">{{ alert2 }}</p>
                    <button @click="togglePassword2" type="button" class="toggle-btn3">
                        <font-awesome-icon :icon="showPassword2 ? 'eye-slash' : 'eye'" />
                    </button>
                    <h6 style="margin-top: 0;">confirmez le mot de passe:</h6>
                    <input v-model="newPass" :type="showPassword3 ? 'text' : 'password'" :class="classname">
                    <button @click="togglePassword2" type="button" class="toggle-btn3">
                        <font-awesome-icon :icon="showPassword3 ? 'eye-slash' : 'eye'" />
                    </button>
                    <button type="button" @click="connect" class="btn btn-success">changer</button>
                </form>
            </div>
       </div>
    </div>

</template>

<script>

    export default{
        data(){
            return{
                oldPass:'',
                newPass:'',
                newPass2:'',
                alert:'',
                alert2:'',
                classname: 'form-control',
                showPassword:false,
                showPassword2:false,
                showPassword3:false,
            }
        },
        methods:{

            togglePassword1() {
                this.showPassword = !this.showPassword;
            },
            togglePassword2() {
                this.showPassword2 = !this.showPassword2;
            },
            togglePassword3() {
                this.showPassword3 = !this.showPassword3;
            },
            connect(){
                if(this.passwordIn !== '123456'){
                    this.alert = 'mot de passe incorrect !!'
                    this.classname = 'form-control border-danger'
                }else{
                    this.$router.push({
                        path: '/welcome'
                    })
                }
            }

        }
    }
</script>


<style>
.toggle-btn2 {
  position: absolute;
  right: 20%;
  top: 42%;
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
  top: 53%;
  transform: translateY(-50%);
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: #ffffff;
}
</style>