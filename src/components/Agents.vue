<template>
    <header class="" style="width: 100%;">
        <h3 id="title">Agents de l'Etat</h3>
        <img id="logo2" src="../assets/Logo_hd_MEF-PETIT-2.png" alt="" width="130px" height="80px">
    </header>

    <div id="searchBar" class="shadow" style="height: 10rem;">
        <form class="text-center">
            <h6 class="mt-4">Tapez l'IM ou le nom pour rechercher un agent :</h6>
            <input v-if="status == 'activite'"  v-model="recherche" placeholder="...IM ou nom..." type="text" class="form-control mb-3" @input="searchActive">
            <input v-else v-model="recherche" placeholder="...IM ou nom..." type="text" class="form-control mb-3" @input="searchRetraite">
            <div class="form-check form-check-inline">
                <input type="radio" id="activite" value="activite" v-model="status" class="form-check-input">
                <label for="activite" class="">En activité</label>
            </div>

            <div class="form-check form-check-inline">
                <input type="radio" id="retraite" value="retraite" v-model="status" class="form-check-input">
                <label for="retraite" class="">Retraité</label>
            </div>
        </form>

        <button id="import" type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#importEx">Importer excel</button>

      <!-- Modal pour importer un fichier -->
      <div class="modal fade" id="importEx" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Importer un fichier Excel</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="this.status == 'activite'? uploadAgent() : uploadRetraite()">
                <input type="file" class="form-control mb-3" @change="handleFileUpload" accept=".xlsx, .xls" required>
                <div class="modal-footer">
                  <button type="submit" class="btn btn-success" :disabled="!file">Importer</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tableau pour les agents en activité -->
    <div v-if="status == 'activite'" id="tableau" class="overflow-x-scroll" style="height: 37rem; width: 163vh;">
        <table class="table table-striped text-center">
            <thead>
                <tr>
                    <th>Matricule</th>
                    <th>Nom</th>
                    <th>Prenoms</th>
                    <th>Date de naissance</th>
                    <th>Sexe</th>
                    <th>CIN</th>
                    <th>Ville</th>
                    <th>Corps</th>
                    <th>Grade</th>
                    <th>Categorie</th>
                    <th>Indice</th>
                    <th>Code section</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="active in resultActive.length ? resultActive : actives " :key="active.matricule">
                    <td>{{ active.matricule }}</td>
                    <td>{{ active.nom }}</td>
                    <td>{{ active.prenoms }}</td>
                    <td>{{ formatDate(active.datenais) }}</td>
                    <td>{{ active.sexe }}</td>
                    <td>{{ active.cin }}</td>
                    <td>{{ active.cp }}</td>
                    <td>{{ active.codecorps }}</td>
                    <td>{{ active.codegrade }}</td>
                    <td>{{ active.codecategorie }}</td>
                    <td>{{ active.indice }}</td>
                    <td>{{ active.codesection }}</td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- Tableau pour les retraités -->
    <div v-if="status == 'retraite'" id="tabRetraite" class="overflow-x-scroll" style="height: 37rem; width: 163vh;">
        <table class="table table-striped text-center">
            <thead>
                <tr>
                    <th>Matricule Pension</th>
                    <th>Nom et prénoms</th>
                    <th>CIN</th>
                    <th>Localité</th>
                    <th>Grade</th>
                    <th>Corps</th>
                    <th>Indice</th>
                    <th>Section</th>
                    <th>Pension net</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="retraite in resultRetraite.length ? resultRetraite : retraites" :key="retraite.matriculepension">
                    <td>{{ retraite.matriculepension }}</td>
                    <td>{{ retraite.nomprenoms }}</td>
                    <td>{{ retraite.cin }}</td>
                    <td>{{ retraite.cp }}</td>
                    <td>{{ retraite.codegrade }}</td>
                    <td>{{ retraite.codecorps }}</td>
                    <td>{{ retraite.indice }}</td>
                    <td>{{ retraite.codesection }}</td>
                    <td>{{ formatNumber(retraite.pensionnet) }}</td>
                </tr>
            </tbody>
        </table>
    </div>

      <!-- Message de Notification -->
    <div v-if="message" :class="`alert ${messageType}`" role="alert">
        {{ message }}
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            status: 'activite',
            actives: [],
            retraites: [],
            resultActive:[],
            resultRetraite:[],
            recherche:'',
            file: null,
            message: "", 
            messageType: "", 
        };
    },
    methods: {

        //Formater les dates en DD/MM/YY avec le mois en lettre
        formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString('fr-FR', {
                day: '2-digit',
                month: 'long', 
                year: 'numeric'
            });
        },

        // recuperer les agent en activité
        async fetchActive() {
            try {
                const active = await axios.get('http://192.168.0.105:3000/api/agent/active');
                this.actives = active.data;
            } catch (error) {
                alert('Erreur lors de la récupération des données des agents en activité');
                console.log(error);
            }
        },

        //recuperer les agents en retraite
        async fetchRetraite() {
            try {
                const retraite = await axios.get('http://192.168.0.105:3000/api/agent/retraite');
                this.retraites = retraite.data;
            } catch (error) {
                alert('Erreur lors de la récupération des données des retraités');
                console.log(error);
            }
        },

        //rechercher un agent en activité
        async searchActive() {
            if (this.recherche.length >= 2) {  // Vérifie que la recherche comporte au moins 3 caractères
                try {
                const response = await axios.get(`http://192.168.0.105:3000/api/agent/active/${this.recherche}`);  // Utilise `this.recherche`
                this.resultActive = response.data;
                } catch (error) {
                console.error('Erreur lors de la recherche:', error);
                this.resultActive = [];
                }
            } else {
                this.resultActive = [];  // Vide les résultats si la chaîne est inférieure à 3 caractères
            }
        },

        //rechercher un agent retraité
        async searchRetraite() {
            if (this.recherche.length >= 2) {  // Vérifie que la recherche comporte au moins 3 caractères
                try {
                const response = await axios.get(`http://192.168.0.105:3000/api/agent/retraite/${this.recherche}`);  // Utilise `this.recherche`
                this.resultRetraite = response.data;
                } catch (error) {
                console.error('Erreur lors de la recherche:', error);
                this.resultRetraite = [];
                }
            } else {
                this.resultRetraite = [];  // Vide les résultats si la chaîne est inférieure à 3 caractères
            }
        },

        formatNumber(number) {
            return number.toLocaleString(); // Formate le nombre avec un séparateur de milliers
        },

        handleFileUpload(event) {
        const selectedFile = event.target.files[0];
        if (selectedFile && (selectedFile.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || selectedFile.type === "application/vnd.ms-excel")) {
          this.file = selectedFile;
        } else {
          this.showMessage("Veuillez sélectionner un fichier Excel valide.", "alert-danger");
          this.file = null;
        }
      },
  
      async uploadAgent() {
        if (!this.file) {
          this.showMessage("Veuillez sélectionner un fichier avant d'importer.", "alert-danger");
          return;
        }
  
        const formData = new FormData();
        formData.append("file", this.file);
  
        try {
          const response = await axios.post("http://local192.168.0.105/agent/active/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
  
          this.showMessage(response.data.message, "alert-success");
          this.file = null; // Réinitialiser le fichier après importation réussie
  
          // Fermer la modal après un court délai
          setTimeout(() => {
            const importModal = new bootstrap.Modal(document.getElementById('importEx'));
            importModal.hide();
          }, 1000);
  
        } catch (error) {
          console.error("Erreur lors de l'importation du fichier :", error.message);
          this.showMessage("Erreur lors de l'importation du fichier.", "alert-danger");
        }
      },

      async uploadRetraite() {
        if (!this.file) {
          this.showMessage("Veuillez sélectionner un fichier avant d'importer.", "alert-danger");
          return;
        }
  
        const formData = new FormData();
        formData.append("file", this.file);
  
        try {
          const response = await axios.post("http://local192.168.0.105/agent/retraite/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
  
          this.showMessage(response.data.message, "alert-success");
          this.file = null; // Réinitialiser le fichier après importation réussie
  
          // Fermer la modal après un court délai
          setTimeout(() => {
            const importModal = new bootstrap.Modal(document.getElementById('importEx'));
            importModal.hide();
          }, 1000);
  
        } catch (error) {
          console.error("Erreur lors de l'importation du fichier :", error.message);
          this.showMessage("Erreur lors de l'importation du fichier.", "alert-danger");
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
    watch: {
        // watcher sur les valeur du type radio du formulaire
        status(newStatus) {
            if (newStatus === 'activite') {
                this.fetchActive();
            } else if (newStatus === 'retraite') {
                this.fetchRetraite();
            }
        }
    },
    created() {
        // appel des fonction une fos la page est chargée
        this.fetchActive();
        this.fetchRetraite();
    }
};
</script>

  <style scoped>

  .alert {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1050;
  }
  </style>