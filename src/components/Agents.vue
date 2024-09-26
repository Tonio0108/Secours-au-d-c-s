<template>
    <header class="" style="width: 100%;">
        <h3 id="title">Agents de l'Etat</h3>
        <img id="logo2" src="../assets/Logo_hd_MEF-PETIT-2.png" alt="" width="130px" height="80px">
    </header>

    <div id="searchBar" class="shadow" style="height: 10rem;">
        <form class="text-center">
            <h6 class="mt-4">Tapez l'IM ou le nom pour rechercher un agent et appuyez sur entrer :</h6>
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

        <!-- Modal d'importation -->
        <div class="modal fade" id="importEx" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Importer un fichier excel</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="handleImport">
                            <input type="file" class="form-control mb-3" @change="handleFileUpload">
                            <div class="modal-footer">
                                <button type="submit" class="btn btn-success">Importer</button>
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
        };
    },
    methods: {

        formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString('fr-FR', {
                day: '2-digit',
                month: 'long',  // ou '2-digit' pour des chiffres
                year: 'numeric'
            });
        },

        async fetchActive() {
            try {
                const active = await axios.get('http://localhost:3000/api/agent/active');
                this.actives = active.data;
            } catch (error) {
                alert('Erreur lors de la récupération des données des agents en activité');
                console.log(error);
            }
        },
        async fetchRetraite() {
            try {
                const retraite = await axios.get('http://localhost:3000/api/agent/retraite');
                this.retraites = retraite.data;
            } catch (error) {
                alert('Erreur lors de la récupération des données des retraités');
                console.log(error);
            }
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

        formatNumber(number) {
            return number.toLocaleString(); // Formate le nombre avec un séparateur de milliers
        },
    },
    watch: {
        status(newStatus) {
            if (newStatus === 'activite') {
                this.fetchActive();
            } else if (newStatus === 'retraite') {
                this.fetchRetraite();
            }
        }
    },
    created() {
        this.fetchActive();
    }
};
</script>
