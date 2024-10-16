

<template>
    <header class="" style="width: 100%;">
        <h3 id="title">Secours au décès</h3>
        <img id="logo2" src="../assets/Logo_hd_MEF-PETIT-2.png" alt=""  width="130px" height="80px">
    </header>

    <div class="boutons">
        <div class="prev">
            <button class="btn btn-outline-danger" :disabled="this.index == 1" @click="this.index--, this.mode = false">
                <i class="bi bi-arrow-left"></i>
                précédent
            </button>
        </div>
        <div class="next">
            <button 
                v-if="index === 3" 
                class="btn btn-outline-success" 
                @click="index++" 
                :disabled="index < 3 || 
                imDefunt === '' || nomDefunt === '' || acte === ''">
                suivant
                <i class="bi bi-arrow-right"></i>
            </button>

            <button 
                v-if="index === 4" 
                class="btn btn-outline-success" 
                @click="index++" 
                :disabled="beneficiaire === '' || cin === '' || status === ''">
                suivant
                <i class="bi bi-arrow-right"></i>
            </button>

            <button v-if="this.index == 5" class="btn btn-outline-success" @click="openModal2('Impression')">
                <i class="bi bi-printer"></i>
                Impression
            </button>
        </div>
        
    </div>
    <div id="searchBarBarem" class="shadow " style="height: 33rem;">
        <div class="row">
            <div class="col-11 mx-auto">
                <div class="timeline-container">
                    <!-- Ligne centrale -->
                    <div class="timeline-line"></div>

                    <!-- Étapes avec étiquettes au-dessus des cercles -->
                    <div class="step-wrapper">
                        <div class="timeline-label">Type de l'agent</div>
                        <div v-if="this.index >=1" :class="this.index == 1 ? isActive : '' " class="timeline-step" style="background-color:rgb(194, 191, 191) ;">
                        </div>
                    </div>
                    <div v-if="this.activite == 'En activité'" class="step-wrapper">
                        <div class="timeline-label">Status</div>
                        <div v-if="this.index >=2" :class="this.index == 2 ? isActive : '' " class="timeline-step" style="background-color:rgb(128, 128, 128) ;"></div>
                    </div>
                    <div v-if="this.activite == 'Retraité'" class="step-wrapper">
                        <div class="timeline-label">Caisse</div>
                        <div v-if="this.index >=2" :class="this.index == 2 ? isActive : '' " class="timeline-step" style="background-color:rgb(128, 128, 128) ;"></div>
                    </div>
                    <div class="step-wrapper">
                        <div class="timeline-label">Recherche</div>
                        <div v-if="this.index >=3" :class="this.index == 3 ? isActive : '' " class="timeline-step" style="background-color:rgb(100, 100, 100) ;"></div>
                    </div>
                    <div class="step-wrapper">
                        <div class="timeline-label">Bénéficiaire</div>
                        <div v-if="this.index >=4" :class="this.index == 4 ? isActive : '' " class="timeline-step" style="background-color:rgb(60, 60, 60) ;"></div>
                    </div>
                    <div class="step-wrapper">
                        <div class="timeline-label">Aperçu</div>
                        <div v-if="this.index >=5" :class="this.index == 5 ? isActive : '' " class="timeline-step" style="background-color:rgb(0, 0, 0) ;"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Première question : En activité ou retraité -->
        <div v-if="index == 1" class="shadow text-center" id="Question1">
        <h4>En activité ou retraité ?</h4>
        <button class="btn btn-outline-success mt-4" @click="openModal('En activité', 'En activité')">En activité</button>
        <button class="btn btn-outline-danger mt-4 ms-5" @click="openModal('Retraité', 'Retraité')">Retraité</button>
        </div>

        <!-- Deuxième question pour ceux en activité : Fonctionnaire ou Contractuel -->
        <div v-if="index == 2 && activite == 'En activité'" class="shadow text-center" id="Question1">
        <h4>Fonctionnaire ou Contractuel ?</h4>
        <button class="btn btn-outline-success mt-4" @click="openModal('Fonctionnaire', 'Fonctionnaire')">Fonctionnaire</button>
        <button class="btn btn-outline-danger mt-4 ms-5" @click="openModal('Contractuel', 'Contractuel')">Contractuel</button>
        </div>

        <!-- Deuxième question pour les retraités : CPR ou CRCM -->
        <div v-if="index == 2 && activite == 'Retraité'" class="shadow text-center" id="Question1">
        <h4>CPR ou CRCM ?</h4>
        <button class="btn btn-outline-success mt-4" @click="openModal('CPR', 'CPR')">CPR</button>
        <button class="btn btn-outline-danger mt-4 ms-5" @click="openModal('CRCM', 'CRCM')">CRCM</button>
        </div>

        <!-- Composant modal réutilisable -->
        <modal
        :isVisible="isModalVisible"
        :title="modalTitle"
        :message="modalMessage"
        @confirm="handleConfirm"
        @close="closeModal"
        />

        <modal2
        :isVisible="isModal2Visible"
        :title="modalTitle"
        :message="modalMessage"
        @confirm="handleConfirm2"
        @close="closeModal2"
        />

        <div v-if="this.index == 3"  class="shadow text-center" id="Question2">
            <form v-if="!this.mode" class="text-center" @submit.prevent="submitForm">
                <h6 >Tapez l'IM ou le nom pour rechercher :</h6>
                <input v-if="activite == 'En activité'" v-model="recherche" placeholder="...IM ou nom..." type="text" class="form-control mb-3">
                <input v-else-if="activite == 'Retraité'" v-model="recherche" placeholder="...IM ou nom..." type="text" class="form-control mb-3">
            </form>
            <div v-if="!this.mode" class="mt-4 overflow-y-scroll" style="margin-left: 1rem; height: 12rem;">

                <table v-if="activite == 'En activité' && resultActive.length" class="table table-striped text-center">
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
                            <th>action</th>
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
                        <td><button 
                            @click="sendToForm(active.matricule, active.nom,active.prenoms,active.codegrade,active.codecategorie,active.indice,active.codesection)"
                            class="btn btn btn-outline-info">
                             <i class="bi bi-check2" style="font-size: 1rem;"></i>
                            </button>
                        </td>
                    </tr>
                    </tbody>

                </table>

                
                <table v-if="this.activite == 'Retraité' && resultRetraite.length"class="table table-striped text-center">
                    <thead>
                        <tr>
                            <th>Matricule</th>
                            <th>Nom et prénoms</th>
                            <th>Corps</th>
                            <th>Grade</th>
                            <th>Indice</th>
                            <th>Section</th>
                            <th>action</th>
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
                            <td><button 
                            @click="sendToForm2(retraite.matriculepension,retraite.nomprenoms,retraite.codegrade,retraite.indice,retraite.codesection)"
                            class="btn btn btn-outline-info">
                             <i class="bi bi-check2" style="font-size: 1rem;"></i>
                            </button>
                        </td>
                        </tr>
                    </tbody>

                </table>
                <div v-if="showError">
                    <h5 class="text-warning">{{ erreur }}</h5>
                    <button class="btn btn-outline-success mt-4" @click="chmod()">Oui</button>
                    <button class="btn btn-outline-danger mt-4 ms-5">Non</button>
                </div>
            </div>
            <div v-if = "this.mode" id="form-secours" class="p-4 rounded-4 shadow overflow-y-scroll" style="height: 20rem; width: 50rem; margin-left: 23rem;">
                    <form @submit.prevent="addSecours">

                        <div class="row mb-3">
                            <div class="col-md-3">
                                <label for="matricule" class="form-label">Matricule du defunt(e) :</label>
                                <input  v-model="imDefunt" type="text" class="form-control" style="width: 10rem;">
                            </div>
                            <div class="col-md-9">
                                <label for="name" class="form-label">Nom et Prenoms du defunt(e) :</label>
                                <input :class="class" v-model="nomDefunt" type="text" class="form-control shadow-sm" style="width: 34rem;">
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-md-3">
                                <label for="grade" class="form-label">Grade :</label>
                                <input v-model="grade" type="text" class="form-control" style="width: 10rem;">
                            </div>
                            <div class="col-md-3" v-if="this.activite == 'En activité'">
                                <label for="categorie" class="form-label">Categorie :</label>
                                <select v-model="categorie" name="annee" class="form-select">
                                    <option v-for="cat in categorie2" :value="cat.categorie"> {{ cat.categorie }}</option>
                                </select>
                            </div>
                            <div class="col-md-3">
                                <label for="indice" class="form-label">Indice :</label>
                                <input v-model="indice" type="number" class="form-control" style="width: 10rem;">
                            </div>

                            <div class="col-md-3">
                                <label  for="annee" class="form-label">Année du bareme utilisé :</label>
                                <select v-model="dateBar" name="annee" class="form-select">
                                    <option v-for="year in years" :value="year.date"> {{ year.date }}</option>
                                </select>
                            </div>
                        </div>
                        <div class="row mb-3" v-if="this.activite === 'Retraité'">
                            <div class="col-md-2">
                                <label for="budget" class="form-label">600 :</label>
                                <input v-model="v600" type="number" class="form-control">
                            </div>
                            <div class="col-md-2">
                                <label for="imputation" class="form-label">601 :</label>
                                <input v-model="v601" type="number" class="form-control">
                            </div>
                            <div class="col-md-2">
                                <label for="imputation" class="form-label">602 :</label>
                                <input v-model="v602" type="number" class="form-control">
                            </div>
                            <div class="col-md-2">
                                <label for="imputation" class="form-label">603 :</label>
                                <input v-model="v603" type="number" class="form-control">
                            </div>
                            <div class="col-md-2">
                                <label for="imputation" class="form-label">604 :</label>
                                <input v-model="v604" type="number" class="form-control">
                            </div>
                            <div class="col-md-2">
                                <label for="imputation" class="form-label">605 :</label>
                                <input v-model="v605" type="number" class="form-control">
                            </div>
                        </div>

                        
                        <div class="row mb-3" v-if="this.activite === 'Retraité'">
                            <div class="col-md-2">
                                <label for="budget" class="form-label">606 :</label>
                                <input v-model="v606" type="number" class="form-control">
                            </div>
                            <div class="col-md-2">
                                <label for="imputation" class="form-label">607 :</label>
                                <input v-model="v607" type="number" class="form-control">
                            </div>
                            <div class="col-md-2">
                                <label for="imputation" class="form-label">608 :</label>
                                <input v-model="v608" type="number" class="form-control">
                            </div>
                            <div class="col-md-2">
                                <label for="imputation" class="form-label">609 :</label>
                                <input v-model="v609" type="number" class="form-control">
                            </div>
                            <div class="col-md-2">
                                <label for="imputation" class="form-label">610 :</label>
                                <input v-model="v610" type="number" class="form-control">
                            </div>
                        </div>

                        <div class="row mb-3">
                            <div class="col-md-3">
                                <label for="section" class="form-label">Section :</label>
                                <input v-model="section" type="text" class="form-control" style="width: 10rem;">
                            </div>

                            <div class="col-md-3">
                                <label for="dateacte" class="form-label">Date de décès :</label>
                                <input :class="class" v-model="dateDec" type="date" class="form-control" style="width: 10rem;">
                            </div>

                            <div class="col-md-3">
                                <label for="acte" class="form-label">Acte de décès n° :</label>
                                <input v-model="acte" type="number" class="form-control" :class="class" style="width: 10rem;">
                            </div>
                            <div class="col-md-3">
                                <label for="dateacte" class="form-label">du :</label>
                                <input v-model="dateActe" type="date" class="form-control" :class="class" style="width: 10rem;">
                            </div>
                        </div>
                    </form>
                </div>

        </div>
        
        <div v-if="this.index == 4"  class="shadow text-center" id="Question4">
            <div class="shadow p-4 rounded-4" style="height: 20rem; width: 45rem; margin-left: 1rem;">
                <h5 style=" text-decoration: underline">informations sur notre défunt(e) :</h5>
                <div class="row mt-4">
                    <div class="col-md-12">
                        <p><strong>IM :</strong> {{ this.imDefunt }}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <p><strong>Nom et prenoms :</strong> {{ this.nomDefunt }}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <p><strong>Grade :</strong> {{ this.grade }}</p>
                    </div>
                    <div class="col-md-4">
                        <p><strong>Indice :</strong> {{ this.indice }}</p>
                    </div>
                    <div class="col-md-4">
                        <p><strong>Categorie :</strong> {{ this.categorie }}</p>
                    </div>

                </div>
                <div class="row">
                    <div class="col-md-4">
                        <p><strong>bareme :</strong> {{ this.dateBar }}</p>
                    </div>
                    <div class="col-md-4">
                        <p><strong>Section :</strong> {{ this.section }}</p>
                    </div>
                    <div class="col-md-4">
                        <p><strong>Décès :</strong> {{ formatDate(this.dateDec) }}</p>
                    </div>
                </div>
                <div class="row">

                    <div class="col-md-4">
                        <p><strong>Acte :</strong> {{ this.acte }}</p>
                    </div>
                    <div class="col-md-4">
                        <p><strong>du :</strong> {{ formatDate(this.dateActe) }}</p>
                    </div>
                </div>

            </div>
            <div id="form-secours" class="shadow-sm p-4 rounded-4" style="height: 20rem; width: 45rem; margin-left: 1rem;">
                <form @submit.prevent="addSecours">

                    <div class="row mb-3">
                        <div class="col-md-6">
                            <label for="benefic" class="form-label">Nom et Prénoms du bénéficiaire :</label>
                            <input :class="class" v-model="beneficiaire" type="text" class="form-control">
                        </div>
                        <div class="col-md-6">
                            <label for="nature" class="form-label">Qualité du bénéficiaire :</label>
                            <select :class="class" v-model="statut" class="form-select" style="width: 20rem;">
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
                        <div class="col-md-6 ms">
                            <label for="cin" class="form-label">CIN du bénéficiaire :</label>
                            <input v-model="cin" type="text" class="form-control">
                        </div>
                        <div class="col-md-6">
                            <label for="datecin" class="form-label">Délivré le :</label>
                            <input v-model="datecin" type="date" class="form-control">
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-md-6">
                            <label for="adresse" class="form-label">Adresse du bénéficiaire :</label>
                            <input v-model="domicile" type="text" class="form-control">
                        </div>
                        <div class="col-md-6 d-flex">
                            <div class="form-check form-check-inline"> 
                                <input v-model="plusieursLit" type="checkbox" id="lit" value="pluralite" class="form-check-input" style="width: 30px; height: 30px; margin-top: 34px;">
                                <label for="lit" class="form-check-label ms-4" style="margin-top: 38px;">Pluralité de lit</label>                        
                            </div>
                            <input v-model="nbLit" v-if="plusieursLit" type="number" class="form-control mt-4" style="width: 70px; height: 40px">
                        </div>
                    </div>

                </form>
            </div>
        </div>
        
        <div v-if="this.index == 5"  class="shadow text-center" id="Question4">
            <div class="shadow p-4 rounded-4" style="height: 20rem; width: 50rem; margin-left: 1rem;">
                <h5 style=" text-decoration: underline">informations sur notre défunt(e) :</h5>
                <div class="row mt-4">
                    <div class="col-md-12">
                        <p><strong>IM :</strong> {{ this.imDefunt }}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <p><strong>Nom et prenoms :</strong> {{ this.nomDefunt }}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <p><strong>Grade :</strong> {{ this.grade }}</p>
                    </div>
                    <div class="col-md-4">
                        <p><strong>Indice :</strong> {{ this.indice }}</p>
                    </div>
                    <div class="col-md-4">
                        <p><strong>Categorie :</strong> {{ this.categorie }}</p>
                    </div>

                </div>
                <div class="row">
                    <div class="col-md-4">
                        <p><strong>bareme :</strong> {{ this.dateBar }}</p>
                    </div>
                    <div class="col-md-4">
                        <p><strong>Section :</strong> {{ this.section }}</p>
                    </div>
                    <div class="col-md-4">
                        <p><strong>Décès :</strong> {{ formatDate(this.dateDec) }}</p>
                    </div>
                </div>
                <div class="row">

                    <div class="col-md-4">
                        <p><strong>Acte :</strong> {{ this.acte }}</p>
                    </div>
                    <div class="col-md-4">
                        <p><strong>du :</strong> {{ formatDate(this.dateActe) }}</p>
                    </div>
                </div>

            </div>
            <div id="form-secours" class=" shadow-sm p-4 rounded-4" style="height: 15rem; width: 40rem; margin-left: 1rem;">
                <h5 style=" text-decoration: underline">informations sur le bénéficiaire :</h5>
                <div class="row mt-4">
                    <div class="col-md-12">
                        <p><strong>Nom et prenoms :</strong> {{ this.beneficiaire }}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <p><strong>Qualité :</strong> {{ this.statut }}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <p><strong>CIN :</strong> {{ (this.cin).replace(/(.{3})(?=.)/g, "$1 ") }}</p>
                    </div>
                    <div class="col-md-6">
                        <p><strong>Du :</strong> {{ formatDate(this.datecin) }}</p>
                    </div>

                </div>
                <div class="row">

                    <div class="col-md-6">
                        <p><strong>Adresse :</strong> {{ this.domicile }}</p>
                    </div>
                </div>
            </div>        
        </div>

    </div>


        <!-- Tableau pour les secours -->
        <div id="tableau" class="overflow-scroll" style="height: 17rem; width: 163vh;">
        <input v-model="recherche" type='text' class = "form-control" placeholder="bénéficiaire ou nom de l'agent ou IM" @input="searchSecours">
        <table id="sec" class="table table-striped text-center mt-3" style="table-layout: fixed; width: 100%;">
            <thead>
                <tr>
                    <th style="white-space: nowrap; width: 110px;">Date</th>
                <th style="white-space: nowrap; width: 300px;">Bénéficiaire</th>
                <th style="white-space: nowrap; width: 90px;">CIN</th>
                <th style="white-space: nowrap; width: 200px;">Qualité</th>
                <th style="white-space: nowrap; width: 300px;">Defunt(e)</th>
                <th style="white-space: nowrap; width: 100px;">IM</th>
                <th style="white-space: nowrap; width: 150px;">Status</th>
                <th style="white-space: nowrap; width: 150px;">Date de décès</th>
                <th style="white-space: nowrap; width: 150px;">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="secours in resultSecours.length ? resultSecours : list" :key="secours.numero">
                    <td>{{ formatDate(secours.date) }}</td>
                    <td>{{ secours.beneficiaire }}</td>
                    <td>{{ secours.cin }}</td>
                    <td>{{ secours.qualite }}</td>
                    <td>{{ secours.nomdef }}</td>
                    <td>{{ secours.imdef }}</td>
 
                    <td>{{ secours.status }}</td>
                    <td>{{ formatDate(secours.datedec) }}</td>

                    <td><button @click="editSecours(secours.beneficiaire,secours.cin, formatDateToYMD(secours.datecin), secours.adresse, secours.qualite, secours.nomdef, secours.imdef, secours.status, secours.activite, secours.grade, secours.indice, secours.categorie, secours.bareme, secours.section, formatDateToYMD(secours.datedec), secours.acte, formatDateToYMD(secours.dateacte), secours.date)" class="btn btn-outline-primary">
                        <i class="bi bi-pencil"></i>
                        </button>
                        <button @click="deleteSecours(secours.imdef,secours.beneficiaire,)" class="btn btn-outline-danger ms-3">
                        <i class="bi bi-trash"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        </div>

        <div style="display: none;">
            <div ref="decision">
                <div  class="d-flex mt-4" id="entete" >
                        <div class=" head text-center" style=" margin-top: 0.5rem; margin-left: 1.5rem; ">
                            <img id="logo" src="../assets/LOGO EF.png" alt="logo" width="100px" height="100px">
                        <h6>
                            ministere de l'economie et des finances <br>
                            secretariat general <br>
                            direction generale du budget et <br>
                            des finances <br>
                            direction de la solde et <br>
                            des pensions
                        </h6>   
                            <strong>Service Régional de la Solde et des Pensions <br> Vatovavy</strong>
                        </div>
                        <div class="text-center"  style=" width: 55rem; margin-top: 1rem; margin-left: 1rem; ;">
                            <img src="../assets/Logo_hd_MEF-PETIT-2.png" alt="" width="170">
                            <div class=" text-start mt-5" style="margin-left: 9rem;">
                                <h6 style="text-transform: uppercase;">
                                    <b>decision</b> n° __________ - mef/sg/dgbf/dsp/srsp/vtv. 
                                    <i style="text-transform: none;">du _________________________</i>
                                </h6>
                                <p style="text-transform: uppercase; font-size: large;">
                                    portant attribution d'un secours au deces           
                                </p>
                            </div>
                        </div>
                        <div class="" style=" width: 17rem ; height: 9rem; margin-top: 2rem; margin-left: 1rem; border: solid 1px black;">
                            <p class="mt-4 ms-3">Visa CF :</p>
                            <p class="mt-4 ms-3">Du</p>    
                        </div>
                    </div>

                    <div  style="width: 60%; height: 3rem; margin-left: 22rem;"  >
                        <table style="border: solid 2px black;">
                            <tbody>
                                <tr>
                                    <td width="800" height="40" style="padding-left: 15px; border-right: solid 1px black; font-size: medium;">
                                        <strong>Aux ayants droits de : {{ nomDefunt }}</strong>
                                    </td>
                                    <td width="200" style="padding-left: 15px; font-size: medium">
                                        <strong>IM : {{ imDefunt }}</strong>
                                    </td>
                                </tr>
                            </tbody>

                        </table>
                    </div>

                    <div class="mt-3"  style="width: 96%; height: 39.5rem; margin-left: 2rem;"  >
                        <table id="decision" class="table-bordered"  style="border: solid 1px black;">
                        <thead class="text-center">
                            <tr>
                                <th>Ancienne Position</th>
                                <th>Nouvelle Position</th>
                            </tr>                
                        </thead>

                        <tbody>
                            <tr>
                                <td>
                                    <table class="inner-table">
                                        <tbody>
                                            <tr>
                                                <td>Budget</td>
                                                <td>: {{ budget }}</td>
                                            </tr>
                                            <tr>
                                                <td>Imputation Budgétaire</td>
                                                <td>: {{ section }}</td>
                                            </tr>
                                            <tr>
                                                <td>Grade ou Emploi</td>
                                                <td>: {{ grade }}</td>
                                            </tr>
                                            <tr>
                                                <td>Indice</td>
                                                <td>: {{ indice }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>

                                <td>
                                    <table class="inner-table">
                                        <tbody>
                                            <tr>
                                                <td>Budget</td>
                                                <td>: {{ budget }}</td>
                                            </tr>
                                            <tr>
                                                <td>Imputation Budgétaire</td>
                                                <td>: {{ imputation }}</td>
                                            </tr>
                                            <tr>
                                                <td>Grade ou Emploi</td>
                                                <td>: {{ grade }}</td>
                                            </tr>
                                            <tr>
                                                <td>Indice</td>
                                                <td>: {{ indice }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>

                            <tr style="height: 15rem;">
                                <td class="text-center" style="padding-top: 3rem; font-size: 0.9rem;">
                                    <p>{{ titre }} {{ beneficiaire }}</p>
                                    <p>Titulaire du CIN n° {{ cin.replace(/(.{3})(?=.)/g, "$1 ") }}</p>
                                    <p>du {{ this.datecin !== "" ? formatDate(datecin) : ""}}</p>
                                    <p>Domicilé à {{ domicile.toUpperCase() }}</p>
                                </td>
                                <td class="text-center" style="padding-top: 2rem; font-size: 0.95rem;">
                                    <p>En application {{ decret }} {{ titre }} {{ beneficiaire }} obtient en tant que {{ statut }} un secours au décès,
                                        au montant d' <strong>Ar {{ parseFloat(montant).toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2})}}</strong><br>
                                        &lt;&lt; {{ this.nombreEnLettre(montant).toUpperCase()  }} &gt;&gt;<br>
                                        <strong v-if="activite == 'En activité' && !plusieursLit">(
                                        <b v-if="v500 > 0">{{ parseFloat(v500).toLocaleString('fr-FR') }} + </b>
                                        <b v-if="v501 > 0">{{ parseFloat(v501).toLocaleString('fr-FR') }} + </b>
                                        <b v-if="v502 > 0">{{ parseFloat(v502).toLocaleString('fr-FR') }} + </b>
                                        <b v-if="v503 > 0">{{ parseFloat(v503).toLocaleString('fr-FR') }} + </b>
                                        <b v-if="v506 > 0">{{ parseFloat(v506).toLocaleString('fr-FR') }}</b>
                                        * {{ multi }}) = {{ parseFloat(montant).toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
                                        </strong>

                                        <strong v-if="activite == 'En activité' && plusieursLit">
                                        [ ( 
                                        <b v-if="v500 > 0">{{ parseFloat(v500).toLocaleString('fr-FR') }} + </b>
                                        <b v-if="v501 > 0">{{ parseFloat(v501).toLocaleString('fr-FR') }} + </b>
                                        <b v-if="v502 > 0">{{ parseFloat(v502).toLocaleString('fr-FR') }} + </b>
                                        <b v-if="v503 > 0">{{ parseFloat(v503).toLocaleString('fr-FR') }} + </b>
                                        <b v-if="v506 > 0">{{ parseFloat(v506).toLocaleString('fr-FR') }}</b>
                                         * {{ multi }})  / {{ nbLit }} ] = {{ parseFloat(montant).toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
                                        </strong>

                                        <strong v-if="activite == 'Retraité' && !plusieursLit">(
                                        <b v-if="v600 > 0">{{ parseFloat(v600).toLocaleString('fr-FR') }} + </b>
                                        <b v-if="v601 > 0">{{ parseFloat(v601).toLocaleString('fr-FR') }} + </b>
                                        <b v-if="v602 > 0">{{ parseFloat(v602).toLocaleString('fr-FR') }} + </b>
                                        <b v-if="v603 > 0">{{ parseFloat(v603).toLocaleString('fr-FR') }} + </b>
                                        <b v-if="v604 > 0">{{ parseFloat(v604).toLocaleString('fr-FR') }} + </b>
                                        <b v-if="v605 > 0">{{ parseFloat(v605).toLocaleString('fr-FR') }} + </b>
                                        <b v-if="v606 > 0">{{ parseFloat(v606).toLocaleString('fr-FR') }} + </b>
                                        <b v-if="v607 > 0">{{ parseFloat(v607).toLocaleString('fr-FR') }} + </b>
                                        <b v-if="v608 > 0">{{ parseFloat(v608).toLocaleString('fr-FR') }} + </b>
                                        <b v-if="v609 > 0">{{ parseFloat(v609).toLocaleString('fr-FR') }} + </b>
                                        <b v-if="v610 > 0">{{ parseFloat(v610).toLocaleString('fr-FR') }}</b>
                                         * {{ multi }}) = {{ parseFloat(montant).toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
                                        </strong>

                                        <strong v-if="activite == 'Retraité' && plusieursLit">
                                        [(
                                        <b v-if="v600 > 0">{{ parseFloat(v600).toLocaleString('fr-FR') }} + </b>
                                        <b v-if="v601 > 0">{{ parseFloat(v601).toLocaleString('fr-FR') }} + </b>
                                        <b v-if="v602 > 0">{{ parseFloat(v602).toLocaleString('fr-FR') }} + </b>
                                        <b v-if="v603 > 0">{{ parseFloat(v603).toLocaleString('fr-FR') }} + </b>
                                        <b v-if="v604 > 0">{{ parseFloat(v604).toLocaleString('fr-FR') }} + </b>
                                        <b v-if="v605 > 0">{{ parseFloat(v605).toLocaleString('fr-FR') }} + </b>
                                        <b v-if="v606 > 0">{{ parseFloat(v606).toLocaleString('fr-FR') }} + </b>
                                        <b v-if="v607 > 0">{{ parseFloat(v607).toLocaleString('fr-FR') }} + </b>
                                        <b v-if="v608 > 0">{{ parseFloat(v608).toLocaleString('fr-FR') }} + </b>
                                        <b v-if="v609 > 0">{{ parseFloat(v609).toLocaleString('fr-FR') }} + </b>
                                        <b v-if="v610 > 0">{{ parseFloat(v610).toLocaleString('fr-FR') }}</b>
                                        ) * {{ multi }}] / {{ nbLit }} = {{ parseFloat(montant).toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
                                        </strong>
                                         égal à {{ nombreEnLettre2(multi) }} mois de la <span v-if="this.activite === 'Retraité'">pension</span><span v-else>solde</span>  du défunt {{ nomDefunt }} ,
                                        matricule {{ imDefunt }} Décédé le {{ this.dateDec !== "" ? formatDate(dateDec) : "" }} suivant l'acte de décès N° {{ acte }} du {{ this.dateActe !== "" ? formatDate(dateActe) : "" }}
                                    </p>
                                </td>
                            </tr>

                            <tr style="height: 1rem;">
                                <td class="text-center">
                                    <p>Ampliations :</p>
                                    <ul>
                                        <li>{{ titre }} {{ beneficiaire }}</li>
                                        <li>Mandat</li>
                                        <li>Archives</li>
                                    </ul>
                                </td>
                                <td class="text-center">
                                    <p>Signature :</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div ref="ed">

                <div class=" head text-center" style=" margin-top: 0.5rem;">
                    <img id="logo" src="../assets/LOGO EF.png" alt="logo" width="100px" height="100px">
                    <h6>
                        ministere de l'economie et des finances <br>
                        secretariat general <br>
                        direction generale du budget et <br>
                        des finances <br>
                        direction de la solde et <br>
                        des pensions
                    </h6>   
                    <strong>Service Régional de la Solde et des Pensions <br> Vatovavy</strong>

                    <h5 style="border: dotted 2px black; margin-top: 3rem; text-transform: uppercase ;width: 20rem; margin-left: auto; margin-right: auto;">~°~ etat de decompte ~°~</h5>
                </div>    


                <div id="etat" style="text-align: center; margin-top: 3rem;">
                <strong>Etat de décompte des sommes à allouer à</strong>
                <table style="margin-top: 1rem;">
                    <tbody>
                        <tr>
                            <td><b>Nom et Prenoms :</b></td>
                            <td>{{ beneficiaire }}</td>
                        </tr>
                        <tr>
                            <td><b>{{ statut }} de :</b></td>
                            <td>{{ nomDefunt }}</td>
                        </tr>
                        <tr>
                            <td><b>Décédé le :</b></td>
                            <td>{{ this.dateDec !== "" ? formatDate(dateDec) : "" }}</td>
                        </tr>
                        <tr>
                            <td><b>Titulaire de l'IM :</b></td>
                            <td>{{ imDefunt }}</td>
                        </tr>
                    </tbody>
                </table>

                <p style="margin-top: 1rem;">
                    En application {{ decret }},  
                    il y a lieu d’appliquer le décompte suivant
                </p>

                <table  style="margin-top: 1rem;">
                    <tbody>
                        <tr>
                            <td><b>Montant du Secours au décès =</b></td>
                            <td v-if="!plusieursLit"> Montant mensuel * {{ multi }}</td>
                            <td v-else> (Montant mensuel * {{ multi }}) / {{ nbLit }}</td>
                        </tr>
                        <tr>
                            <td><b>Montant mensuel =</b></td>
                            <td>{{ parseFloat(montantMens).toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</td>
                        </tr>
                        <tr v-if="!plusieursLit">
                            <td><b>Montant mensuel * {{ multi }} =</b></td>
                            <td>{{ parseFloat(montantMens).toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }} * {{ multi }}</td>
                        </tr>
                        <tr v-else>
                            <td><b>(Montant mensuel * {{ multi }}) / {{ nbLit }} =</b></td>
                            <td>({{ parseFloat(montantMens).toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }} * {{ multi }}) / {{ nbLit }}</td>
                        </tr>
                        <tr>
                            <td><b>Montant du Secours au décès =</b></td>
                            <td>{{ parseFloat(montant).toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</td>
                        </tr>
                    </tbody>
                </table>

                <p style="margin-top: 1rem;">
                    <strong>ARRETE LE PRESENT ETAT DE DECOMPTE A LA SOMME DE {{ nombreEnLettre(montant).toUpperCase() }}</strong>
                </p>

                <p style = "text-align: right; margin-top: 1rem;">Mananjary, le____________________________________</p>
                </div>



                </div>
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
    import modal from './modal.vue'
    import modal2 from './modal2.vue'
    import n2words from 'n2words';
    import html2pdf from 'html2pdf.js'
    export default{
        components :{
            modal,
            modal2
        },
        data(){
            return{
                
                resultActive: [],
                resultRetraite: [],
                resultSecours:[],
                recherche: '',
                list: [],
                message:'',
                messageType:'',
                index: 1,
                erreur:'Agent introuvable ! Voulez-vous procéder manuellement ?',
                mode: false,
                nomDefunt: '',
                imDefunt:  '',
                grade: '',
                indice: '',
                beneficiaire: '',
                cin: '',
                datecin: '',
                domicile: '',
                v500: 0,
                v501: 0,
                v502: 0,
                v503: 0,
                v506: 0,
                v600: 0,
                v601: 0,
                v602: 0,
                v603: 0,
                v604: 0,
                v605: 0,
                v606: 0,
                v607: 0,
                v608: 0,
                v609: 0,
                v610: 0,
                dateDec: '',
                acte: '',
                dateActe: '',
                statut: '',
                plusieursLit: false,
                activite: 'En activité',
                fonction: '',
                nbLit: 0,
                categorie:'',
                categorie2: [],
                dateBar:'',
                class:'',
                section: '',
                isActive:'orange',
                isModalVisible: false,
                isModal2Visible: false,
                modalTitle: "",
                modalMessage: "",
                selectedOption: "",
                showError: false,
                years:[],
                date: null
            }
        },

        computed: {
            titre() {
                // Calculer le titre dynamiquement en fonction du statut
                if (!this.statut) return "";
                return this.statut.toLowerCase().includes("veuve") || this.statut.toLowerCase().includes("tutrice")
                ? "Madame"
                : "Monsieur";
            },

            decret() {
                // Vérification si activite est "Retraité"
                if (this.activite === "Retraité" && this.fonction === "CRCM") {
                return "des dispositions du Décret n°62-144 du 21 Mars 1962, portant organisation de règlement de la Caisse de Retraites Civiles et Militaires et du Décret n° 62-144 susvisé notamment en son article 13";
                }

                if (this.activite === "Retraité" && this.fonction === "CPR") {
                return "des dispositions du , Décret n°61-642 du 29 Novempbre 1961 portant organisation de règlement de la Caisse de Prevoyance de Retraite";
                }

                // Vérification si activite est "En activité" et fonction est "Fonctionnaire"
                if (this.activite === "En activité" && this.fonction === "Fonctionnaire") {
                return "de l’article 37 de la loi n° 2003-011 du 03-09-03 relative au statut général des Fonctionnaires";
                }

                // Vérification si activite est "En activité" et fonction est "Contractuelle"
                if (this.activite === "En activité" && this.fonction === "Contractuelle") {
                return "de l’article 35 de la loi n° 94-025 du 17-11-94 relative au statut général des Agents non encadrés de l’Etat";
                }

                // Valeur par défaut si aucune condition n'est remplie
                return "Condition non reconnue";
            },

            imputation(){
                if (this.activite === "Retraité" && this.fonction === "CRCM") {
                return "02-23-2-F48-31715-6521";
                }
                if (this.activite === "Retraité" && this.fonction === "CPR") {
                return "02-23-2-F48-31715-6522";
                }
                if (this.activite) {
                return "00-21-9-111-31715-6011";
                }
            },

            budget(){
                if (this.activite === "Retraité") {
                return "02";
                }

                if (this.activite) {
                return "GENERAL";
                }
            },

            multi() {

                if (this.activite === "En activité" && this.fonction === "Fonctionnaire") {
                return 12;
                }

                if ((this.activite === "En activité" && this.fonction === "Contractuelle") || this.activite === "Retraité") {
                return 3;
                }

                // Valeur par défaut si aucune condition n'est remplie
                return 3; // Assurez-vous de gérer tous les cas
            },

            montantMens() {
            if (this.activite === 'En activité') {
                // Vérifie que les valeurs existent ou sinon utilise 0 par défaut
                return (
                (this.v500 || 0) + 
                (this.v501 || 0) + 
                (this.v502 || 0) + 
                (this.v503 || 0) + 
                (this.v506 || 0)
                ).toFixed(2);
            } else {

                console.log('Retraité - valeurs:', this.v600, this.v601, this.v602, this.v603, this.v604, this.v605, this.v606, this.v607, this.v608, this.v609, this.v610);
                return (
                (this.v600 || 0) + 
                (this.v601 || 0) + 
                (this.v602 || 0) + 
                (this.v603 || 0) + 
                (this.v604 || 0) + 
                (this.v605 || 0) + 
                (this.v606 || 0) + 
                (this.v607 || 0) + 
                (this.v608 || 0) + 
                (this.v609 || 0) + 
                (this.v610 || 0)
                ).toFixed(2);
            }
            },


            montant() {
                if(!this.plusieursLit){
                    return (this.montantMens * this.multi).toFixed(2)
                }

                else{
                    return ((this.montantMens * this.multi) / (this.nbLit || 1)).toFixed(2)
                }

            },
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
            submitForm() {
                // Réinitialiser l'affichage d'erreur avant de faire la recherche
                this.showError = false;

                if (this.activite === 'En activité') {
                    this.searchActive().then(() => {
                        // Vérifier les résultats après la recherche
                        if (this.resultActive.length < 1) {
                            this.showError = true; // Aucun résultat trouvé
                        } else {
                            this.showError = false; // Résultats trouvés
                        }
                    });
                } else if (this.activite === 'Retraité') {
                    this.searchRetraite().then(() => {
                        // Vérifier les résultats après la recherche
                        if (this.resultRetraite.length < 1) {
                            this.showError = true; // Aucun résultat trouvé
                        } else {
                            this.showError = false; // Résultats trouvés
                        }
                    });
                }
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

            async deleteSecours(imdef, beneficiaire) {
                try {
                // Confirmation de la suppression
                const confirmation = confirm("Êtes-vous sûr de vouloir supprimer ce dossier ?");
                if (!confirmation) return;

                // Envoi de la requête de suppression
                const response = await axios.delete('http://localhost:3000/api/secours/delete', {
                    data: {
                    imdef,
                    beneficiaire
                    }
                });

                // Afficher le message de succès
                this.showMessage(response.data.message,'alert-success');

                // Mettre à jour la liste après suppression
                this.list = this.list.filter(secours => !(secours.imdef === imdef && secours.beneficiaire === beneficiaire));

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

            chmod(){
                this.mode = !this.mode
            },
            openModal(option, message) {
            this.modalTitle = "Confirmation";
            this.modalMessage = `Êtes-vous sûr de choisir "${message}" ?`;
            this.selectedOption = option;
            this.isModalVisible = true;
            },

            openModal2(option) {
            this.modalTitle = "Confirmation";
            this.modalMessage = `Êtes-vous sûr de l'imprimer ?`;
            this.selectedOption = option;
            this.isModal2Visible = true;
            },
            handleConfirm() {
            if (this.index == 1) {
                this.setActivite(this.selectedOption);
            } else if (this.index == 2) {
                this.setFonction(this.selectedOption);
            }
            },

            handleConfirm2() {
                this.generateDecision();

                // Passer une fonction anonyme à setTimeout
                setTimeout(() => {
                    this.generateED(); // Appel de generateED après 2 secondes
                }, 2000);

                setTimeout(() => {
                    this.addSecours(); // Appel de generateED après 2 secondes
                }, 3000);
            },

            setActivite(status) {
            this.activite = status;
            this.index++
            },
            setFonction(fonction) {
            this.fonction = fonction;
            this.index++
            console.log("Activité:", this.activite, "Fonction:", fonction);
            },
            closeModal() {
            this.isModalVisible = false;
            },
            closeModal2() {
            this.isModal2Visible = false;
            },

            sendToForm(im,fname,name,grade,categorie,indice,section){
                this.imDefunt = im
                this.nomDefunt = (fname + '' + (name || '')).replace(/\s+/g, ' ')
                this.grade = grade
                this.categorie = categorie
                this.indice = indice
                this.section = section
                this.mode = true
            },
            sendToForm2(im,name,grade,indice,section){
                this.imDefunt = im
                this.nomDefunt = name
                this.grade = grade
                this.indice = indice
                this.section = section
                this.mode = true
            },
            
            async fetchBareme(categorie, indice,annee) {
            try {
                const response = await axios.get(`http://localhost:3000/api/bareme/${categorie}/${indice}/${annee}`);
                let bareme = response.data;
                console.log('Données reçues:', bareme); // Ajoutez ce log pour voir la structure de bareme

                // Vérifiez si bareme n'est pas vide et mettez à jour les valeurs
                if (bareme && bareme.length > 0) {
                this.v500 = bareme[0].v500 || 0;
                this.v501 = bareme[0].v501 || 0;
                this.v502 = bareme[0].v502 || 0;
                this.v503 = bareme[0].v503 || 0;
                this.v506 = bareme[0].v506 || 0;
                console.log('Valeurs mises à jour:', this.v500, this.v501, this.v502, this.v503, this.v506);
                } else {
                showMessage('Aucune donnée trouvée dans la réponse.' ,'alert-warning');
                }
            } catch (error) {
                this.showMessage('Erreur lors de la récupération des données :' + error, 'alert-danger');
            }
        },

        async fetchYearBar() {
            try {
                const year = await axios.get('http://localhost:3000/bareme/year');
                this.years = year.data;
            } catch (error) {
                alert('Erreur lors de la récupération des données des retraités');
                console.log(error);
            }
        },

        async fetchCategorie() {
            try {
                const categorie = await axios.get('http://localhost:3000/categorie');
                this.categorie2 = categorie.data;
            } catch (error) {
                alert('Erreur lors de la récupération des données des retraités');
                console.log(error);
            }
        },

            nombreEnLettre(nb) {
            let texte = n2words(nb, { lang: "fr" });
            if (Number.isInteger(nb)) {
                texte += " ariary";
            } else {
                texte = texte.replace("virgule", "Ariary");
            }
            return texte;
            },

            nombreEnLettre2(nb) {
            return n2words(nb, { lang: "fr" });
            },

            async generateDecision() {

            
                if(this.activite == "En activité"){
                    await this.fetchBareme(this.categorie, this.indice, this.dateBar); // Attendez que fetchBareme soit terminé
                }   
            
                const element = this.$refs.decision;
                const options = {
                    margin: 1,
                    filename: "document.pdf",
                    image: { type: "jpeg", quality: 0.98 },
                    html2canvas: { scale: 3 },
                    jsPDF: { unit: "mm", format: "a3", orientation: "landscape" },
                };
                html2pdf()
                    .from(element)
                    .set(options)
                    .outputPdf("blob")
                    .then((pdfBlob) => {
                    const url = URL.createObjectURL(pdfBlob);
                    window.open(url);
                    });
                
            },


            async generateED() {

          
            if(this.activite == "En activité"){
                await this.fetchBareme(this.categorie, this.indice, this.dateBar); // Attendez que fetchBareme soit terminé
            }
        
            // Sélectionner l'élément à convertir en PDF
            const element = this.$refs.ed;

            // Configurer les options de html2pdf
            const options = {
                margin: 2,
                filename: 'document.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 3 },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };
            // Générer le PDF en blob et l'ouvrir dans une nouvelle fenêtre
            html2pdf()
                .from(element)
                .set(options)
                .outputPdf('blob')
                .then((pdfBlob) => {
                const url = URL.createObjectURL(pdfBlob);
                window.open(url);
                });
            
            },

            
            async addSecours() {
                const newSecours = {
                    beneficiaire: this.beneficiaire,
                    cin: this.cin,
                    datecin: this.datecin || '',
                    adresse: this.domicile,
                    qualite: this.statut,
                    nomdef: this.nomDefunt,
                    imdef: this.imDefunt,
                    status: this.fonction,
                    activite: this.activite,
                    grade: this.grade,
                    indice: this.indice,
                    categorie: this.categorie,
                    bareme: this.dateBar,
                    section: this.section,
                    datedec: this.dateDec || '',
                    acte: this.acte,
                    dateacte: this.dateActe || '',
                    date: this.date ? this.formatDateWithMilliseconds(this.date) : null, // Formater si la date existe
                };

                if (!this.beneficiaire || !this.cin || !this.nomDefunt || !this.imDefunt) {
                    this.showMessage("Veuillez remplir tous les champs obligatoires.", "alert-danger");
                    return;
                }

                try {
                    const response = await axios.post('http://localhost:3000/api/secours', newSecours);
                    this.showMessage(response.data.message, 'alert-success');
                    this.fetchSecours()
                } catch (error) {
                    console.error('Erreur lors de l\'ajout du dossier:', error.message);
                    this.showMessage('Erreur lors de l\'ajout du dossier : ' + error, 'alert-danger');
                }
            },

            formatDateWithMilliseconds(date) {
                const d = new Date(date);
                const year = d.getFullYear();
                const month = String(d.getMonth() + 1).padStart(2, '0'); // Mois de 0 à 11
                const day = String(d.getDate()).padStart(2, '0'); // Jour du mois
                const hours = String(d.getHours()).padStart(2, '0');
                const minutes = String(d.getMinutes()).padStart(2, '0');
                const seconds = String(d.getSeconds()).padStart(2, '0');
                const milliseconds = String(d.getMilliseconds()).padStart(3, '0'); // Ajout de millisecondes

                return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
            },

            formatDateToYMD(date) {
                if (date) {
                    // Créer un objet Date à partir de la date
                    const formattedDate = new Date(date).toISOString().slice(0, 10); // 'YYYY-MM-DD'
                    return formattedDate;
                }
                return null; // Si la date est invalide ou manquante
            },


            editSecours(beneficiaire, cin, datecin, adresse, qualite, nomdef, imdef, status, activite, grade, indice, categorie, bareme, section, datedec, acte, dateacte,date){
                this.index = 3
                this.mode = true
                this.beneficiaire = beneficiaire
                this.cin = cin,
                this.datecin = datecin,
                this.domicile = adresse
                this.statut = qualite
                this.nomDefunt = nomdef
                this.imDefunt = imdef
                this.fonction = status
                this.activite = activite
                this.grade = grade
                this.indice = indice
                this.categorie = categorie
                this.dateBar = bareme
                this.section = section
                this.dateDec = datedec
                this.acte = acte
                this.dateActe = dateacte
                this.date = date
                console.log(this.date)
            }
        },
        mounted(){
            this.fetchSecours()
            this.fetchYearBar()
            this.fetchCategorie()
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
  height: 23rem;
  margin-left: 10px;
  margin-top: 1rem;
  border-radius: 10px;
  padding-top: 2rem;
  border: solid 1px 
}

#Question4{
  text-align: left !important;
  display: flex;
  width: 98%;
  height: 23rem;
  margin-left: 10px;
  margin-top: 1rem;
  border-radius: 10px;
  padding-top: 2rem;
  border: solid 1px 
}

#Question3{
  width: 55rem;
  height: 26rem;
  margin-left: 21%;
  margin-top: 0.5rem;
  border-radius: 10px;
  padding-top: 2rem;
  border: solid 1px 
}
.orange{
    background-color: orange !important
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

.prev{
    position: absolute;
    bottom: 20rem;
    left: 23rem;
}

.next{
    position: absolute;
    bottom: 20rem;
    right: 2rem;
}

</style>