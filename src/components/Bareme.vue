<template>
        <header class="" style="width: 100%;">
            <h3 id="title">Bareme de solde</h3>
            <img id="logo2" src="../assets/Logo_hd_MEF-PETIT-2.png" alt=""  width="130px" height="80px">
        </header>

        <button id="importB" class="btn btn-success" data-bs-toggle="modal" data-bs-target="importEx">Importer excel</button>
        <form class="text-center">
            <div class="form-group">
                <label for="annee">Année</label>
                <select v-model="annee" class="form-select" name="annee" id="annee">
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                </select>
            </div>
        </form>
        <div id="tableauBar" class=" overflow-y-scroll" style="height: 50rem; width: 100%; margin-top: 20px">
        <table class="table text-center" >
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
                <tr>
                    
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                annee:"2024"
            }
        }
    }
</script>