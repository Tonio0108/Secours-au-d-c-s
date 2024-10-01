<template>
    <header class="" style="width: 100%;">
        <h3 id="title">Secours au décès</h3>
        <img id="logo2" src="../assets/Logo_hd_MEF-PETIT-2.png" alt=""  width="130px" height="80px">
    </header>


    <div id="searchBarBarem" class="shadow " style="height: 22rem;">
        <form class="text-center">
            <h6 class="mt-4">Tapez l'IM ou le nom pour rechercher :</h6>
            <input v-if="status == 'activite'"  v-model="recherche" placeholder="...IM ou nom..." type="text" class="form-control mb-3" @input="searchActive">
            <input v-else-if="status == 'retraite'" v-model="recherche" placeholder="...IM ou nom..." type="text" class="form-control mb-3" @input="searchRetraite">
            <input v-else v-model="recherche" placeholder="...IM ou nom..." type="text" class="form-control mb-3" @input="searchSecours">
        
            <div class="form-check form-check-inline">
                <input type="radio" id="activite" value="activite" v-model="status" class="form-check-input">
                <label for="activite" class="form-check-label">En activité</label>
            </div>

            <div class="form-check form-check-inline">
                <input type="radio" id="retraite" value="retraite" v-model="status" class="form-check-input">
                <label for="retraite" class="form-check-label">Retraité</label>
            </div>
            <div class="form-check form-check-inline">
                <input type="radio" id="secours" value="secours" v-model="status" class="form-check-input">
                <label for="secours" class="form-check-label">Secours</label>
            </div>
        </form>

        <div class="mt-4 overflow-y-scroll" style="margin-left: 1rem; height: 12rem;">

            <table v-if="status == 'activite'" class="table table-striped text-center">
                <thead>
                    <tr>
                        <th>Matricule</th>
                        <th>Nom</th>
                        <th>Prénoms</th>
                        <th>Corps</th>
                        <th>Grade</th>
                        <th>Categorie</th>
                        <th>Indice</th>
                        <th>Section</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="active in resultActive" :key="active.matricule">
                    <td>{{ active.matricule }}</td>
                    <td>{{ active.nom }}</td>
                    <td>{{ active.prenoms }}</td>
                    <td>{{ active.codecorps }}</td>
                    <td>{{ active.codegrade }}</td>
                    <td>{{ active.codecategorie }}</td>
                    <td>{{ active.indice }}</td>
                    <td>{{ active.codesection }}</td>
                </tr>
                </tbody>

            </table>

            
            <table v-else class="table table-striped text-center">
                <thead>
                    <tr>
                        <th>Matricule</th>
                        <th>Nom et prénoms</th>
                        <th>Corps</th>
                        <th>Grade</th>
                        <th>Indice</th>
                        <th>Section</th>
                        <th>Pension net</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="retraite in resultRetraite" :key="retraite.matriculepension">
                        <td>{{ retraite.matriculepension }}</td>
                        <td>{{ retraite.nomprenoms }}</td>
                        <td>{{ retraite.codecorps }}</td>
                        <td>{{ retraite.codegrade }}</td>
                        <td>{{ retraite.indice }}</td>
                        <td>{{ retraite.codesection }}</td>
                        <td>{{ retraite.pensionnet }}</td>
                     </tr>
                </tbody>

            </table>
        </div>
        <div id="decisionBtn" class="dropdown open">
            <button class="btn btn-success dropdown-toggle" type="button" id="triggerId" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Décision et ED
                </button>
            <div class="dropdown-menu" aria-labelledby="triggerId">
                <button class="dropdown-item" @click="decision">Pour l'agent recherché</button>
                <RouterLink  class="dropdown-item" to="/decision">Manuellement</RouterLink>
            </div>
        </div>
    </div>

        <!-- Tableau pour les secours -->
        <div id="tableau" class="overflow-scroll" style="height: 25rem; width: 163vh;">
        <table class="table table-striped text-center">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Bénéficiaire</th>
                    <th>CIN</th>
                    <th>En tant que</th>
                    <th>De la defunt(e)</th>
                    <th>IM</th>
                    <th>Décédé le</th>
                    <th>Acte de décès N°</th>
                    <th>Du</th>
                    <th>Montant du secours au décès</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="secours in resultSecours.length ? resultSecours : list" :key="secours.numero">
                    <td>{{ formatDate(secours.date) }}</td>
                    <td>{{ secours.beneficiaire }}</td>
                    <td>{{ secours.cin }}</td>
                    <td>{{ secours.qtbeneficiaire }}</td>
                    <td>{{ secours.nomdef }}</td>
                    <td>{{ secours.matriculedef }}</td>
                    <td>{{ secours.datedec }}</td>
                    <td>{{ secours.acte }}</td>
                    <td>{{ secours.dateacte }}</td>
                    <td>{{ secours.montant }}</td>
                    <td><button @click="deleteSecours(secours.matriculedef,secours.beneficiaire,)" class="btn btn-outline-danger"><i class="bi bi-trash"></i></button></td>
                </tr>

            </tbody>
        </table>
    </div>

      <!-- Message de Notification -->
      <Transition>
        <div v-if="message" :class="`alert ${messageType}`" role="alert">
          {{ message }}
        </div>
      </Transition>
</template>

<script>
    import axios from 'axios';

    export default{
        data(){
            return{
                status: "activite",
                resultActive: [],
                resultRetraite: [],
                resultSecours:[],
                recherche: '',
                list: [],
                message:'',
                messageType:'',
            }
        },
        methods:{

            //Formater les dates en DD/MM/YY avec le mois en lettre
            formatDate(dateString) {
                const date = new Date(dateString);
                return date.toLocaleDateString('fr-FR', {
                    day: '2-digit',
                    month: 'long', 
                    year: 'numeric'
                });
            },
            async searchActive() {
            if (this.recherche.length >= 2) {  // Vérifie que la recherche comporte au moins 3 caractères
                try {
                const response = await axios.get(`http://localhost:3000/api/agent/active/${this.recherche}`);  // Utilise `this.recherche`
                this.resultActive = response.data;
                } catch (error) {
                console.error('Erreur lors de la recherche:', error);
                this.resultActive = [];
                }
            } else {
                this.resultActive = [];  // Vide les résultats si la chaîne est inférieure à 3 caractères
            }
        },

            async searchRetraite() {
                if (this.recherche.length >= 2) {  // Vérifie que la recherche comporte au moins 3 caractères
                    try {
                    const response = await axios.get(`http://localhost:3000/api/agent/retraite/${this.recherche}`);  // Utilise `this.recherche`
                    this.resultRetraite = response.data;
                    } catch (error) {
                    console.error('Erreur lors de la recherche:', error);
                    this.resultRetraite = [];
                    }
                } else {
                    this.resultRetraite = [];  // Vide les résultats si la chaîne est inférieure à 3 caractères
                }
            },

            async searchSecours() {
                if (this.recherche.length >= 2) {  // Vérifie que la recherche comporte au moins 3 caractères
                    try {
                    const response = await axios.get(`http://localhost:3000/api/secours/recherche/${this.recherche}`);  // Utilise `this.recherche`
                    this.resultSecours = response.data;
                    } catch (error) {
                    console.error('Erreur lors de la recherche:', error);
                    this.resultSecours = [];
                    }
                } else {
                    this.resultSecours = [];  // Vide les résultats si la chaîne est inférieure à 3 caractères
                }
            },

            decision(){
                const agent = this.resultActive[0] || this.resultRetraite[0];
                console.log(agent)

                // Rediriger vers /decision avec des données pré-remplies
                this.$router.push({
                    path: '/decision',
                    query: {
                        nomDefunt: (agent.nom && agent.prenoms) ? (agent.nom + ' ' + agent.prenoms).replace(/\s+/g, ' ') : (agent.nomprenoms || agent.nom || ''),
                        imDefunt: agent.matricule || agent.matriculepension || '', 
                        grade: agent.codegrade || '',
                        categorie: agent.codecategorie || '',
                        indice: agent.indice || '',
                        imputation: agent.codesection || '',
                        pension: agent.pensionnet || ''
                    },
                });


            },
            async fetchSecours(){
                try{
                    const res = await axios.get('http://localhost:3000/api/secours/list')
                    this.list = res.data
                    console.log(this.list)
                }catch(err){
                    console.error('Erreur lors de la recherche:', err);
                    this.list = [];
                }
            },

            async deleteSecours(matriculedef, beneficiaire) {
                try {
                // Confirmation de la suppression
                const confirmation = confirm("Êtes-vous sûr de vouloir supprimer ce dossier ?");
                if (!confirmation) return;

                // Envoi de la requête de suppression
                const response = await axios.delete('http://localhost:3000/api/secours/delete', {
                    data: {
                    matriculedef,
                    beneficiaire
                    }
                });

                // Afficher le message de succès
                this.showMessage(response.data.message,'alert-success');

                // Mettre à jour la liste après suppression
                this.list = this.list.filter(secours => !(secours.matriculedef === matriculedef && secours.beneficiaire === beneficiaire));

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
        mounted(){
            this.fetchSecours()
        }
    }
</script>

<style scoped>
  .alert {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1050;
  }
</style>