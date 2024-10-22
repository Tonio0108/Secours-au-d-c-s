<template>
    <div>
      <button id="importB" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#importEx">Importer Excel</button>
  
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
              <form @submit.prevent="uploadBareme">
                <input type="file" class="form-control mb-3" @change="handleFileUpload" accept=".xlsx, .xls" required>
                <div class="modal-footer">
                  <button @click="uploadBareme" class="btn btn-primary" :disabled="loading">
                    Importer
                    <span v-if="loading" class="spinner-border spinner-border-sm ms-2" role="status" aria-hidden="true"></span>
                  </button>

                  <p v-if="loading" class="text-muted mt-2">Importation en cours...</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
  
      <div id="searchBarBarem" class="shadow" style="height: 45rem;">
        <form class="text-center">
          <div class="row mb-3">
            <div class="col-2 mx-auto">
              <label for="indice" class="form-label">Categorie :</label>
              <select v-model="categorie" class="form-select" name="categorie">
                <option v-for="cat in categorie2" :value="cat.categorie"> {{ cat.categorie }} </option>
              </select>
            </div>
            <div class="col-2 mx-auto">
              <label for="indice" class="form-label">Indice :</label>
              <input v-model="indice" type="text" class="form-control" required style="width: 150px;">
            </div>
            <div class="col-2 mx-auto">
              <label for="annee" class="form-label">Année :</label>
              <select v-model="annee" class="form-select" name="annee">
                <option v-for="year in years" :value="year.date"> {{ year.date }} </option>
              </select>
            </div>
            <div class="col-2">
              <button class="btn btn-success" type="button" @click="fetchBareme(categorie, indice, annee)" style="margin-top: 29px;">Rechercher</button>
            </div>
          </div>
        </form>
        <div class="mt-4 overflow-x-auto" style="margin-left: 1rem; height: 35rem;">
          <table class="table table-striped text-center">
            <thead>
              <tr>
                <th>Date</th>
                <th>Categorie</th>
                <th>Indice</th>
                <th>V500</th>
                <th>V501</th>
                <th>V502</th>
                <th>V503</th>
                <th>V506</th>
                <th>Solde</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="bar in bareme" :key="bar.indice">
                <td>{{ formatDate(bar.date) }}</td>
                <td>{{ bar.categorie }}</td>
                <td>{{ bar.indice }}</td>
                <td v-if="bar.v500 > 0">{{ bar.v500 }}</td>
                <td v-else>-</td>
                <td v-if="bar.v501 > 0">{{ bar.v501 }}</td>
                <td v-else>-</td>
                <td v-if="bar.v502 > 0">{{ bar.v502 }}</td>
                <td v-else>-</td>
                <td v-if="bar.v503 > 0">{{ bar.v503 }}</td>
                <td v-else>-</td>
                <td v-if="bar.v506 > 0">{{ bar.v506 }}</td>
                <td v-else>-</td>
                <td v-if="bar.solde > 0">{{ bar.solde }}</td>
                <td v-else>-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <!-- Message de Notification -->
      <Transition>
        <div v-if="message" :class="`alert ${messageType}`" role="alert">
          {{ message }}
        </div>
      </Transition>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        annee: "",
        bareme: [],
        categorie: "",
        categorie2: [],
        indice: "",
        file: null, // Pour stocker le fichier sélectionné
        message: "", // Pour les messages de notification
        messageType: "", // 'alert-success' ou 'alert-danger'
        years:[],
        loading: false
      };
    },
    methods: {
      async fetchBareme(categorie, indice, annee) {
        try {
          if (!categorie || !indice || !annee) {
            this.showMessage("Tous les champs de recherche sont requis.", "alert-danger");
            return;
          }
          const response = await axios.get(`http://192.168.0.109:3000/api/bareme/${categorie}/${indice}/${annee}`);
          this.bareme = response.data; // Assignez les données reçues à votre variable bareme
          if (this.bareme.length === 0) {
            this.showMessage("Aucun bareme trouvé pour les critères spécifiés.", "alert-warning");
          } else {
            this.showMessage("Données récupérées avec succès.", "alert-success");
          }
        } catch (error) {
          console.error('Erreur lors de la récupération des données :', error.message);
          this.showMessage("Erreur lors de la récupération des données.", "alert-danger");
        }
      },

        async fetchCategorie() {
            try {
                const categorie = await axios.get('http://192.168.0.109:3000/categorie');
                this.categorie2 = categorie.data;
            } catch (error) {
                alert('Erreur lors de la récupération des données des retraités');
                console.log(error);
            }
        },

        async fetchYearBar() {
            try {
                const year = await axios.get('http://192.168.0.109:3000/bareme/year');
                this.years = year.data;
            } catch (error) {
                alert('Erreur lors de la récupération des données des retraités');
                console.log(error);
            }
        },


      formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        });
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
  
      async uploadBareme() {
        if (!this.file) {
          this.showMessage("Veuillez sélectionner un fichier avant d'importer.", "alert-danger");
          return;
        }

        const formData = new FormData();
        formData.append("file", this.file);
        this.loading = true; // Activer le chargement

        try {
          const response = await axios.post("http://192.168.0.109:3000/bareme/upload", formData, {
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
        } finally {
          this.loading = false; // Désactiver le chargement une fois terminé
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

    mounted(){
      this.fetchCategorie()
      this.fetchYearBar()
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
  