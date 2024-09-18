<template>

    <div class="container">
        <div id="title" class="text-center">
            <h2>service regional des soldes et des pensions</h2>
            <h4>Secours au deces</h4>
        </div>
        <hr>
       <div id="formulaire" class="d-flex">
            <div class=" col-5">
                <img src="../assets/Logo_hd_MEF-PETIT-2.png" alt="logo FE" width="600px">
            </div>
            <div class="col-6 shadow rounded-4 text-center">
                <form action="" class=" form-group">
                    <label for="ancien" style="margin-top: 2rem;">Ancien mot de passe :</label>
                    <input type="password" class="form-control mt-2" name="ancien">
                    <label for="nouveau" style="margin-top: 1rem;">Nouveau mot de passe :</label>
                    <input type="password" class="form-control mt-2" name="nouveau">
                    <label for="confirmation" style="margin-top:1rem;">Confirmez le mot de passe :</label>
                    <input type="password" class="form-control mt-2" name="confirmation">
                    <button type="submit" class="btn btn-success mt-3">Entrer</button>
                    <a href="" class="btn btn-danger mt-3 ms-5">Annuler</a>
                </form>
            </div>
       </div>
    </div>

</template>
