<template>
    <header class="" style="width: 100%;">
        <h3 id="title">Secours au décès</h3>
        <img id="logo2" src="../assets/Logo_hd_MEF-PETIT-2.png" alt=""  width="130px" height="80px">
    </header>


    <div id="searchBarSec" class="shadow " style="height: 22rem;">
        <form class="text-center">
            <h6 class="mt-4">Tapez l'IM ou le nom pour rechercher un agent et appuyez sur entrer :</h6>
            <input placeholder="...IM ou nom..." type="text" class="form-control mb-3">

            <div class="form-check form-check-inline">
                <input type="radio" id="activite" value="activite" v-model="status" class="form-check-input">
                <label for="activite" class="form-check-label">En activité</label>
            </div>

            <div class="form-check form-check-inline">
                <input type="radio" id="retraite" value="retraite" v-model="status" class="form-check-input">
                <label for="retraite" class="form-check-label">Retraité</label>
            </div>
        </form>


        <button id="import" class="btn btn-success" data-bs-toggle="modal" data-bs-target="importEx">Importer excel</button>

        <div class="mt-4" style="margin-left: 1rem;">
            <table class="table table-striped text-center">
                <thead>
                    <tr>
                        <th>Matricule</th>
                        <th>Nom</th>
                        <th>Prénoms</th>
                        <th>Corps</th>
                        <th>Grade</th>
                        <th>Categorie</th>
                        <th>Indice</th>
                    </tr>

                </thead>
            </table>
        </div>
        <div id="decisionBtn" class="dropdown open">
            <button class="btn btn-success dropdown-toggle" type="button" id="triggerId" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Décision et ED
                </button>
            <div class="dropdown-menu" aria-labelledby="triggerId">
                <RouterLink  class="dropdown-item" to="/statistique">Pour l'agent recherché</RouterLink>
                <RouterLink  class="dropdown-item" to="/decision">Manuellement</RouterLink>
            </div>
        </div>
    </div>

</template>

<script>
    export default{
        data(){
            return{
                status: "",
            }
        }
    }
</script>