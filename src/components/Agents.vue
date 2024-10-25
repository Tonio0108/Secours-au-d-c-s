<template>
    <div id="searchBar" class="shadow" style="height: 10rem;">
        <form class="text-center">
            <h6 class="mt-3">Tapez l'IM ou le nom pour rechercher un agent :</h6>
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
      <div class="modal fade" id="importEx" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true" style="">
        <div class="modal-dialog modal-xl" role="document" >
            <div class="modal-content" style="width: 150vh !important;">
            <div class="modal-header">
                <h5 class="modal-title">Importer un fichier Excel</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <h3 class="text-center">NOTICE</h3>

                <ul>
                <li>
                    Avant d'importer le fichier Excel, assurez-vous que le nom de chaque colonne dans la liste des agents <b>En activité</b> correspond à :
                    <table class="table table-bordered text-center mt-4">
                    <thead>
                        <tr>
                        <th class="bg-body-secondary">AGENTMATRICULE</th>
                        <th class="bg-body-secondary">AGENTNOM</th>
                        <th class="bg-body-secondary">AGENTPRENOMS</th>
                        <th class="bg-body-secondary">AGENTSEXE</th>
                        <th class="bg-body-secondary">AGENTDATENAIS</th>
                        <th class="bg-body-secondary">AGENTCIN</th>
                        <th class="bg-body-secondary">FIVCODE</th>
                        <th class="bg-body-secondary">GRADECODE</th>
                        <th class="bg-body-secondary">CATEGORIECODE</th>
                        <th class="bg-body-secondary">SECTIONCODE</th>
                        <th class="bg-body-secondary">CORPSCODE</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>...</td>
                        <td>...</td>
                        <td>...</td>
                        <td>...</td>
                        <td>...</td>
                        <td>...</td>
                        <td>...</td>
                        <td>...</td>
                        <td>...</td>
                        <td>...</td>
                        <td>...</td>
                        </tr>
                    </tbody>
                    </table>
                </li>
                <li>
                    Avant d'importer le fichier Excel, assurez-vous que le nom de chaque colonne dans la liste des agents <b>Retraité</b> correspond à :
                    <table class="table table-bordered text-center mt-4">
                    <thead>
                        <tr>
                        <th class="bg-body-secondary">PENSION_NUMERO_MATRICULE</th>
                        <th class="bg-body-secondary">NOM_PRENOMS</th>
                        <th class="bg-body-secondary">CIN</th>
                        <th class="bg-body-secondary">LOCALITE_CODE</th>
                        <th class="bg-body-secondary">GRADE_CODE</th>
                        <th class="bg-body-secondary">SECTION_CODE</th>
                        <th class="bg-body-secondary">CORPSCODE</th>
                        <th class="bg-body-secondary">INDICE</th>
                        <th class="bg-body-secondary">MONTANT_PENSION_NET</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>...</td>
                        <td>...</td>
                        <td>...</td>
                        <td>...</td>
                        <td>...</td>
                        <td>...</td>
                        <td>...</td>
                        <td>...</td>
                        <td>...</td>
                        </tr>
                    </tbody>
                    </table>
                </li>
                <li>
                    Les ordres ne sont pas obligatoires, l'application gérera l'ordre des colonnes, mais les colonnes mentionnées sont obligatoires.
                </li>
                </ul>
                <form @submit.prevent="this.status == 'activite' ? uploadAgent() : uploadRetraite()">
                <input type="file" class="form-control mb-3" @change="handleFileUpload" accept=".xlsx, .xls" required>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-primary" :disabled="loading">
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
    </div>

    <!-- Tableau pour les agents en activité -->
    <div v-if="status == 'activite'" id="tableau" class=" overflow-y-auto " style="height: 38rem;">
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
    <div v-if="status == 'retraite'" id="tabRetraite" class=" overflow-y-auto " style="height: 38rem;">
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
            loading: false,
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
                const active = await axios.get('http://192.168.0.10:3000/api/agent/active');
                this.actives = active.data;
            } catch (error) {
                alert('Erreur lors de la récupération des données des agents en activité');
                console.log(error);
            }
        },

        //recuperer les agents en retraite
        async fetchRetraite() {
            try {
                const retraite = await axios.get('http://192.168.0.10:3000/api/agent/retraite');
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
                const response = await axios.get(`http://192.168.0.10:3000/api/agent/active/${this.recherche}`);  // Utilise `this.recherche`
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
                const response = await axios.get(`http://192.168.0.10:3000/api/agent/retraite/${this.recherche}`);  // Utilise `this.recherche`
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
        this.loading = true; // Activer le chargement

        try {
            // Supprimer les données existantes dans la table active
            const supp = await axios.delete('http://192.168.0.10:3000/api/agent/active/delete');
            if (supp.status === 200) {
            this.showMessage("Données supprimées avec succès.", "alert-success");
            } else {
            this.showMessage("Échec de la suppression des données.", "alert-danger");
            return; // Arrêter l'exécution si la suppression échoue
            }

            // Importer le nouveau fichier
            const response = await axios.post("http://192.168.0.10:3000/agent/active/upload", formData, {
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



        async uploadRetraite() {
            if (!this.file) {
                this.showMessage("Veuillez sélectionner un fichier avant d'importer.", "alert-danger");
                return;
            }

            const formData = new FormData();
            formData.append("file", this.file);
            this.loading = true; // Activer l'état de chargement

            try {
                // Supprimer les données existantes dans la table active
                const supp = await axios.delete('http://192.168.0.10:3000/api/agent/retraite/delete');
                if (supp.status === 200) {
                this.showMessage("Données supprimées avec succès.", "alert-success");
                } else {
                this.showMessage("Échec de la suppression des données.", "alert-danger");
                return; // Arrêter l'exécution si la suppression échoue
                }

                // Importer le nouveau fichier
                const response = await axios.post("http://192.168.0.10:3000/agent/retraite/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                });

                this.showMessage(response.data.message, "alert-success");
                this.file = null; // Réinitialiser le fichier après l'importation

                // Fermer la modal après un court délai
                setTimeout(() => {
                const importModal = new bootstrap.Modal(document.getElementById('importEx'));
                importModal.hide();
                }, 1000);

            } catch (error) {
                console.error("Erreur lors de l'importation du fichier :", error.message);
                this.showMessage("Erreur lors de l'importation du fichier.", "alert-danger");
            } finally {
                this.loading = false; // Désactiver l'état de chargement
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