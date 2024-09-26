<template>
        <header class="" style="width: 100%;">
            <h3 id="title">Bareme de solde</h3>
            <img id="logo2" src="../assets/Logo_hd_MEF-PETIT-2.png" alt=""  width="130px" height="80px">
        </header>

        <button id="importB" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#importEx">Importer excel</button>

                <!-- Modal -->
        <div class="modal fade" id="importEx" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Importer un fichier excel</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                    </div>
                    <div class="modal-body">
                        <form action="">
                            <input type="file" class="form-control mb-3">
                            <div class="modal-footer">
                                <button type="submit" class="btn btn-success">importer</button>
                            </div>
                         </form>
                        </div>
                </div>
            </div>
        </div>

        <div id="searchBarBarem" class="shadow " style="height: 45rem;">
            <form class="text-center">
                <div class="row mb-3">
                    <div class="col-2">
                        <label for="categorie" class="form-label">Categorie</label>
                        <input v-model="categorie" required type="text" class="form-control" style="width: 100px;">
                    </div>
                    <div class="col-2">
                        <label for="name" class="form-label">Indice</label>
                        <input v-model="indice" type="text" class="form-control" required style="width: 150px;"
                    </div>
                    <div class="col-2">
                        <button class="btn btn-success" type="button"@click="fetchBareme(this.categorie,this.indice)" style="margin-top: 29px;">Rechercher</button>
                    </div>
                </div>
            </form>
            <div class="mt-4  overflow-x-auto" style="margin-left: 1rem; height: 35rem;">
                <table class="table table-striped text-center" >
                    <thead >
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
                            <td>{{ bar.date }}</td>
                            <td>{{ bar.categorie }}</td>
                            <td>{{ bar.indice }}</td>
                            <td>{{ bar.v500 }}</td>
                            <td>{{ bar.v501 }}</td>
                            <td>{{ bar.v502 }}</td>
                            <td>{{ bar.v503 }}</td>
                            <td>{{ bar.v506 }}</td>
                            <td>{{ bar.solde }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

</template>

<script>

import axios from 'axios'

    export default{
        data(){
            return{
                annee:"",
                bareme: [],
                categorie: "",
                indice:"",
            }
        },

        methods:{
           async fetchBareme(categorie,indice){
                    try {
                    const response = await axios.get(`http://localhost:3000/api/bareme/${categorie}/${indice}`);

                    this.bareme = response.data; // Assignez les données reçues à votre variable bareme
                    } catch (error) {
                    console.error('Erreur lors de la récupération des données :', error.message);
                    }    
            }
        }
    }
</script>