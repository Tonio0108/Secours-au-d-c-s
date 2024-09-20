<template>
        <header class="" style="width: 100%;">
            <h3 id="title">Décision et état de décompte</h3>
            <img id="logo2" src="../assets/Logo_hd_MEF-PETIT-2.png" alt=""  width="130px" height="80px">
        </header>

        <div id="form-secours" class="shadow p-4 bg-light rounded overflow-y-scroll" style="height: 50rem; width: 50rem; margin-left: 23rem;">
            <form>
                <div class="row mb-3">
                    <div class="col-md-6">
                        <label for="matricule" class="form-label">Matricule du defunt(e) :</label>
                        <input name="matricule" type="text" class="form-control">
                    </div>
                    <div class="col-md-6">
                        <label for="name" class="form-label">Nom et Prenoms du defunt(e) :</label>
                        <input name="name" type="text" class="form-control">
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-md-4">
                        <label for="grade" class="form-label">Grade :</label>
                        <input name="grade" type="text" class="form-control" style="width: 10rem;">
                    </div>
                    <div class="col-md-4">
                        <label for="categorie" class="form-label">Categorie :</label>
                        <input name="categorie" type="text" class="form-control" style="width: 10rem;">
                    </div>
                    <div class="col-md-4">
                        <label for="indice" class="form-label">Indice :</label>
                        <input name="indice" type="text" class="form-control" style="width: 10rem;">
                    </div>

                </div>
                <div class="row mb-3">
                    <div class="col-md-6">
                        <label for="budget" class="form-label">Budget :</label>
                        <input name="budget" type="text" class="form-control">
                    </div>
                    <div class="col-md-6">
                        <label for="imputation" class="form-label">Imputation budgétaire :</label>
                        <input name="imputation" type="text" class="form-control">
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-md-12">
                        <label for="benefic" class="form-label">Nom et Prénoms du bénéficiaire :</label>
                        <input name="benefic" type="text" class="form-control">
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-md-6 ms">
                        <label for="cin" class="form-label">CIN du bénéficiaire :</label>
                        <input name="cin" type="text" class="form-control">
                    </div>
                    <div class="col-md-6">
                        <label for="datecin" class="form-label">Délivré le :</label>
                        <input name="datecin" type="date" class="form-control">
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-md-12">
                        <label for="adresse" class="form-label">Adresse du bénéficiaire :</label>
                        <input name="adresse" type="text" class="form-control">
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-md-6">
                        <label for="acte" class="form-label">Acte de décès n° :</label>
                        <input name="acte" type="text" class="form-control">
                    </div>
                    <div class="col-md-6">
                        <label for="dateacte" class="form-label">du :</label>
                        <input name="dateacte" type="date" class="form-control">
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-md-12">
                        <label for="nature" class="form-label">Statut du bénéficiaire :</label>
                        <select name="nature" class="form-select" style="width: 20rem;">
                            <option value="veuf">veuf</option>
                            <option value="veuve">veuve</option>
                            <option value="veuf et tuteur d’un enfant mineur">veuf et tuteur d’un enfant mineur</option>
                            <option value="veuve et tutrice d’un enfant mineur">veuve et tutrice d’un enfant mineur</option>
                            <option value="veuf et tuteur des enfants mineurs">veuf et tuteur des enfants mineurs</option>
                            <option value="veuve et tutrice des enfants mineurs">veuve et tutrice des enfants mineurs</option>
                            <option value="tuteur d'un enfant mineur">tuteur d'un enfant mineur</option>
                            <option value="tutrice d'un enfant mineur">tutrice d'un enfant mineur</option>
                            <option value="tuteur des enfants mineurs">tuteur des enfants mineurs</option>
                            <option value="tutrice des enfants mineurs">tutrice des enfants mineurs</option>
                        </select>
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-md-6">
                        <div class="form-check form-check-inline">
                            <input type="radio" id="activite" name="status" value="activite" class="form-check-input">
                            <label for="activite" class="form-check-label">En activité</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input type="radio" id="retraite" name="status" value="retraite" class="form-check-input">
                            <label for="retraite" class="form-check-label">Retraité</label>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-check form-check-inline">
                            <input type="checkbox" id="lit" value="pluralite" class="form-check-input">
                            <label for="lit" class="form-check-label">Pluralité de lit</label>
                        </div>
                    </div>
                </div>

                <div class="d-flex justify-content-end">
                    <button type="submit" class="btn btn-success">Aperçu avant impression</button>
                </div>
            </form>
        </div>

</template>