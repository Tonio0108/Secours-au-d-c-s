<template>
    <div class="container text-center mt-3">
      <h3>Liste des utilisateurs de l'application :</h3>
  
      <div class="row overflow-scroll " id="tab">
        <button
          id="btn_add"
          class="col-1 btn btn-dark rounded"
          data-bs-toggle="modal"
          data-bs-target="#add"
        >
          <i class="bi bi-plus-circle text-light"></i>
        </button>
        <table class="table table-responsive mt-2 table-striped">
          <thead>
            <tr>
                <th>Nom d'utilisateur</th>
                <th>Nom complet</th>
                <th>IM</th>
                <th>Crée le</th>
            </tr>

          </thead>
          <tbody>
            <tr v-for="user in this.res" :key="user.username">
                <td>{{ user.username }}</td>
                <td>{{ user.fullname }}</td>
                <td>{{ user.im }}</td>
                <td>{{ formatDate(user.created) }}</td>
              <td>
                <div class="dropdown open">
                  <button
                    class="btn btn-sm btn-secondary dropdown-toggle"
                    type="button"
                    id="triggerId"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i class="bi bi-pencil text-light"></i>
                  </button>
                  <div class="dropdown-menu" aria-labelledby="triggerId">
                    <button class="dropdown-item" @click="" data-bs-toggle="modal" data-bs-target="#editForm">Modifier</button>
                    <button class="dropdown-item text-danger" @click="destroy(user.username)">Supprimer</button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  
    <div class="modal fade" id="add">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4>Nouvelle enregistrement</h4>
            <button class="btn btn-close" data-bs-dismiss="modal"></button>
          </div>
          <form @submit.prevent="add">
            <div class="modal-body text-center">
                <label for="username">Nom d'Utilisateur :</label>
                <input v-model="username" type="text" name="username" class="form-control mt-1">
                <label for="name" class="mt-2"> Nom et prénoms :</label>
                <input v-model="fullname" type="text" name="name" class="form-control mt-1">
                <label for="im" class="mt-2"> IM :</label>
                <input v-model="im" type="text" name="im" class="form-control mt-1">
                <label for="pwd" class="mt-2"  > Mot de passe :</label>
                <input v-model="password" type="password"  name="pwd" class="form-control mt-1" :class="className">
                <label for="pwd2" class="mt-2"> Confirmez le mot de passe :</label>
                <input v-model="password2" type="password" name="pwd2" class="form-control mt-1" :class="className" >
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-dark">Enregistrer</button>
              <button class="btn btn-danger" data-bs-dismiss="modal">Annuler</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  
    <!-- Formulaire de mise à jour -->
    <div class="modal fade" id="editForm">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4>Modifier l'utilisateur</h4>
            <button class="btn btn-close" data-bs-dismiss="modal"></button>
          </div>
          <form>
            <div class="modal-body text-center">

            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-dark">Enregistrer</button>
            </div>
          </form>
        </div>
      </div>
    </div>

          <!-- Message de Notification -->
    <Transition>
        <div v-if="message" :class="`alert ${messageType}`" role="alert">
          {{ message }}
        </div>
    </Transition>
  </template>

    <style scoped>

    .alert {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 1050;
    }
    </style>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      fullname: '',
      im: '',
      password: '',
      password2: '',
      message: "", 
      messageType: "", 
      res: [],
      className:''
    };
  },
  methods: {

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: 'long', 
            year: 'numeric'
        });
    },
    async add() {
      // Vérifier si les mots de passe correspondent
      if (this.password !== this.password2) {
        this.showMessage('Les mots de passe ne correspondent pas', 'alert-danger');
        this.className = 'border-danger'
        return;
      }

      const newUser = {
        username: this.username,
        fullname: this.fullname,
        im: this.im,  // Correction ici pour utiliser le champ IM correct
        password: this.password,
      };

      try {
        const response = await axios.post('http://localhost:3000/api/register', newUser);
        this.showMessage(response.data.message, 'alert-success'); // Affiche le message de succès
        this.fetch(); // Mettre à jour la liste après l'ajout
        // Optionnel : Vider le formulaire après l'ajout
        this.username = '';
        this.fullname = '';
        this.im = '';
        this.password = '';
        this.password2 = '';

        setTimeout(() => {
            window.location.reload();
        },2000)

      } catch (error) {
        this.showMessage('Erreur lors de l\'ajout de l\'utilisateur : ' + error, 'alert-danger');
      }
    },

    async fetch() {
      try {
        const result = await axios.get('http://localhost:3000/api/users');
        this.res = result.data; // Récupérer les utilisateurs
        console.log(this.res);
      } catch (error) {
        this.showMessage('Erreur lors de la récupération des utilisateurs', 'alert-danger');
        console.log(error);
      }
    },

    async destroy(username){
        try {
                // Confirmation de la suppression
                const confirmation = confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?");
                if (!confirmation) return;

                // Envoi de la requête de suppression
                const response = await axios.delete('http://localhost:3000/api/users/delete', {
                    data: {
                    username,
                    }
                });

                // Afficher le message de succès
                this.showMessage(response.data.message,'alert-success');
                setTimeout(() => {
                    window.location.reload();
                },2000)
                } catch (error) {
                console.error("Erreur lors de la suppression du dossier :", error);
                alert("Erreur lors de la suppression du dossier.");
                }
    },

    showMessage(msg, type) {
      this.message = msg;
      this.messageType = type;

      // Masquer le message après 5 secondes
      setTimeout(() => {
        this.message = "";
        this.messageType = "";
      }, 5000);
    },
  },
  mounted() {
    // Appel de la méthode fetch lors du montage du composant pour récupérer les utilisateurs
    this.fetch();
  }
};
</script>

  