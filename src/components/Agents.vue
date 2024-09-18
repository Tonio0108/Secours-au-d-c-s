<template>
    <header class="" style="width: 100%;">
        <h3 id="title">Agents de l'Etat</h3>
        <img id="logo2" src="../assets/Logo_hd_MEF-PETIT-2.png" alt=""  width="130px" height="80px">
    </header>

    <div id="searchBar" class="shadow " style="height: 10rem;">
        <form class="text-center">
            <h6 class="mt-4">Tapez l'IM ou le nom pour rechercher un agent et appuyez sur entrer :</h6>
            <input placeholder="...IM ou nom..." type="text" class="form-control mb-3">

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
                            <input placeholder="...IM ou nom..." type="file" class="form-control mb-3">

                            <div class="form-check form-check-inline">
                                <input type="radio" id="activite" value="activite" v-model="status" class="form-check-input">
                                <label for="activite" class="">En activité</label>
                            </div>

                            <div class="form-check form-check-inline">
                                <input type="radio" id="retraite" value="retraite" v-model="status" class="form-check-input">
                                <label for="retraite" class="">Retraité</label>
                            </div> 
                        
                            
                            <div class="modal-footer">
                                <button type="submit" class="btn btn-success">importer</button>
                            </div>
                         </form>
                        </div>
                </div>
            </div>
        </div>
    </div>
    
    <div v-if="status == 'activite' " id="tableau" class=" overflow-x-scroll" style="height: 37rem; width: 100%;">
        <table class="table table-striped text-center" >
            <thead >
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
                    <th>Mode de paiement</th>
                    <th>Numero de compte</th>
                    <th>Poste N°</th>
                    <th>Code section</th>
                    <th>Code Sanction</th>
                    <th>HEE code</th>
                </tr>

            </thead>

            <tbody>
                <tr>
                    <td>25612354</td>
                    <td>RAKOTONIRINA</td>
                    <td>Jean</td>
                    <td>01/02/1998</td>
                    <td>M</td>
                    <td>216011032478</td>
                    <td>Mananjary</td>
                    <td>EX23</td>
                    <td>GR65</td>
                    <td>7</td>
                    <td>1324</td>
                    <td>1</td>
                    <td>13542568127513 4</td>
                    <td>4532123</td>
                    <td>01325</td>
                    <td>02</td>
                    <td>-</td>
                </tr>
                
            </tbody>
        </table>
    </div>

    <div v-if="status == 'retraite' " id="tabRetraite" class=" overflow-x-scroll" style="height: 37rem; width: 100%;">
        <table class="table text-center">
            <thead>
                <tr>
                    <th>Nom et prénoms</th>
                    <th>Nom veuve</th>
                    <th>CIN</th>
                    <th>Localité</th>
                    <th>Adresse</th>
                    <th>Code billeteur</th>
                    <th>Grade</th>
                    <th>Corps</th>
                    <th>Indice</th>
                    <th>Matricule Pension</th>
                    <th>Mode de paiement</th>
                    <th>Zone</th>
                    <th>Section</th>
                    <th>Bonif_anciennete</th>
                    <th>Total gain</th>
                    <th>Total retenu</th>
                    <th>Pension net</th>
                    <th>Taux honorifique</th>
                    <th>Type de pension</th>
                    <th>Beneficiaire</th>
                    <th>Date de revision</th>
                    <th>Date de reversion</th>
                    <th>Rubrique</th>
                    <th>Montant rubrique</th>
                    <th>Date fin</th>
                </tr>

            </thead>

            <tbody>
                <tr>

                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default{
        data(){
            return {
            status: 'activite' 
            };
        }
    }
</script>
