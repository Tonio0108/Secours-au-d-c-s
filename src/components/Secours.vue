<template>
    <header class="" style="width: 100%;">
        <h3 id="title">Secours au décès</h3>
        <img id="logo2" src="../assets/Logo_hd_MEF-PETIT-2.png" alt=""  width="130px" height="80px">
    </header>


    <div id="searchBarBarem" class="shadow " style="height: 22rem;">
        <form class="text-center">
            <h6 class="mt-4">Tapez l'IM ou le nom pour rechercher un agent et appuyez sur entrer :</h6>
            <input v-if="status == 'activite'"  v-model="recherche" placeholder="...IM ou nom..." type="text" class="form-control mb-3" @input="searchActive">
            <input v-else v-model="recherche" placeholder="...IM ou nom..." type="text" class="form-control mb-3" @input="searchRetraite">

            <div class="form-check form-check-inline">
                <input type="radio" id="activite" value="activite" v-model="status" class="form-check-input">
                <label for="activite" class="form-check-label">En activité</label>
            </div>

            <div class="form-check form-check-inline">
                <input type="radio" id="retraite" value="retraite" v-model="status" class="form-check-input">
                <label for="retraite" class="form-check-label">Retraité</label>
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
                <button @click="decision">Pour l'agent recherché</button>
                <RouterLink  class="dropdown-item" to="/decision">Manuellement</RouterLink>
            </div>
        </div>
    </div>

</template>

<script>
    import axios from 'axios';

    export default{
        data(){
            return{
                status: "activite",
                resultActive: [],
                resultRetraite: [],
                recherche: '',
            }
        },
        methods:{

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

        decision(){
            const agent = this.resultActive[0] || this.resultRetraite[0];
            console.log(agent)

            // Rediriger vers /decision avec des données pré-remplies
            this.$router.push({
                path: '/decision',
                query: {
                nomDefunt: agent.nom || agent.nomprenoms || '', 
                imDefunt: agent.matricule || agent.matriculepension || '', 
                grade: agent.codegrade || '',
                categorie: agent.codecategorie || '',
                indice:agent.indice || '',
                imputation: agent.codesection || '',
                pension:agent.pensionnet || ''
                },
            });
        }
        },
    }
</script>