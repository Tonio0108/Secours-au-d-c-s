<template>
    <header class="" style="width: 100%;">
        <h3 id="title">Secours au décès</h3>
        <img id="logo2" src="../assets/Logo_hd_MEF-PETIT-2.png" alt=""  width="130px" height="80px">
    </header>


    <div id="searchBarBarem" class="shadow " style="height: 33rem;">
        <div class="row">
            <div class="col-11 mx-auto">
                <div class="timeline-container">
                    <!-- Ligne centrale -->
                    <div class="timeline-line"></div>

                    <!-- Étapes avec étiquettes au-dessus des cercles -->
                    <div class="step-wrapper">
                        <div class="timeline-label">Activité</div>
                        <div v-if="this.index >=1" class="timeline-step bg-secondary">
                        </div>
                    </div>
                    <div class="step-wrapper">
                        <div class="timeline-label">Fonction</div>
                        <div v-if="this.index >=2" class="timeline-step bg-secondary"></div>
                    </div>
                    <div class="step-wrapper">
                        <div class="timeline-label">Recherche</div>
                        <div v-if="this.index >=3" class="timeline-step bg-secondary"></div>
                    </div>
                    <div class="step-wrapper">
                        <div class="timeline-label">Bénéficiaire</div>
                        <div v-if="this.index >=4" class="timeline-step bg-secondary"></div>
                    </div>
                    <div class="step-wrapper">
                        <div class="timeline-label">Aperçu</div>
                        <div v-if="this.index >=5" class="timeline-step bg-secondary"></div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="this.index == 1" class="shadow text-center" id="Question1">
            <h4>En activité ou retraité ?</h4>
            <button class="btn btn-outline-success mt-4 ">En activité</button>
            <button class="btn btn-outline-danger mt-4 ms-5">Retraité</button>
        </div>

        <div v-if="this.index == 2"  class="shadow text-center" id="Question1">
            <h4>Fonctionnaire ou Contractuel ?</h4>
            <button class="btn btn-outline-success mt-4 ">Fonctionnaire</button>
            <button class="btn btn-outline-danger mt-4 ms-5">Contractuel</button>
        </div>

        <div v-if="this.index == 3"  class="shadow text-center" id="Question2">
            <form class="text-center">
                <h6 class="">Tapez l'IM ou le nom pour rechercher :</h6>
                <input v-if="status == 'activite'"  v-model="recherche" placeholder="...IM ou nom..." type="text" class="form-control mb-3" @input="searchActive">
                <input v-else-if="status == 'retraite'" v-model="recherche" placeholder="...IM ou nom..." type="text" class="form-control mb-3" @input="searchRetraite">
                <input v-else v-model="recherche" placeholder="...IM ou nom..." type="text" class="form-control mb-3" @input="searchSecours">
            </form>

            <div class="mt-4 overflow-y-scroll" style="margin-left: 1rem; height: 12rem;">

                <table v-if="status == 'activite' && resultActive.length" class="table table-striped text-center">
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

                
                <table v-if="this.status == 'retraite' && resultRetraite.length"class="table table-striped text-center">
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
                <h5 class="text-warning"> {{ erreur }}</h5>
                <button class="btn btn-outline-success mt-4 ">Oui</button>
                <button class="btn btn-outline-danger mt-4 ms-5">Non</button>
            </div>
            
        </div>
    </div>

        <!-- Tableau pour les secours -->
        <div id="tableau" class="overflow-scroll" style="height: 12rem; width: 163vh;">
        <table class="table table-striped text-center">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Bénéficiaire</th>
                    <th>CIN</th>
                    <th>En tant que</th>
                    <th>De la defunt(e)</th>
                    <th>IM</th>
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
                    <td>{{ secours.acte }}</td>
                    <td>{{ formatDate(secours.dateacte) }}</td>
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
                status: "retraite",
                resultActive: [],
                resultRetraite: [],
                resultSecours:[],
                recherche: '',
                list: [],
                message:'',
                messageType:'',
                index: 3,
                erreur:'Agent introuvable ! Voulez-vous procéder manuellement ?'
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
                const response = await axios.get(`http://192.168.0.104:3000/api/agent/active/${this.recherche}`);  // Utilise `this.recherche`
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
                    const response = await axios.get(`http://192.168.0.104:3000/api/agent/retraite/${this.recherche}`);  // Utilise `this.recherche`
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
                    const response = await axios.get(`http://192.168.0.104:3000/api/secours/recherche/${this.recherche}`);  // Utilise `this.recherche`
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
                        pension: agent.pensionnet || ''
                    },
                });


            },
            async fetchSecours(){
                try{
                    const res = await axios.get('http://192.168.0.104:3000/api/secours/list')
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
                const response = await axios.delete('http://192.168.0.104:3000/api/secours/delete', {
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

  #Question1{
    width: 30rem;
    height: 10rem;
    margin-left: 35%;
    margin-top: 6rem;
    border-radius: 10px;
    padding-top: 2rem;
    border: solid 1px 
  }

  #Question2{
    width: 98%;
    height: 25rem;
    margin-left: 10px;
    margin-top: 1rem;
    border-radius: 10px;
    padding-top: 2rem;
    border: solid 1px 
  }
        /* Style pour les cercles */
        .timeline-step {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            font-size: 16px;
            z-index: 2;
        }
        /* Style pour la ligne centrale */
        .timeline-line {
            height: 2px;
            background-color: #949494;
            position: absolute;
            top: 75%;
            left: 0;
            right: 0;
            z-index: 1;
        }
        /* Positionnement des cercles */
        .timeline-container {
            position: relative;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        /* Style pour les étiquettes au-dessus des cercles */
        .timeline-label {
            font-weight: bold;
            margin-bottom: 10px;
            text-align: center;
        }
        .step-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
        }
</style>