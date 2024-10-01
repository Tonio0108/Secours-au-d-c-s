<template>
        <header class="" style="width: 100%;">
            <h3 id="title">Décision et état de décompte</h3>
            <img id="logo2" src="../assets/Logo_hd_MEF-PETIT-2.png" alt=""  width="130px" height="80px">
        </header>

        <div id="form-secours" class="shadow p-4 bg-light rounded overflow-y-scroll" style="height: 50rem; width: 50rem; margin-left: 23rem;">
            <form @submit.prevent="addSecours">
                <div class="row mb-3">
                    <div class="col-md-8">
                        <div class="form-check form-check-inline">
                            <input v-model="activite" type="radio" id="activite" name="status" value="En activité" class="form-check-input">
                            <label  for="activite" class="form-check-label">En activité</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input v-model="activite" type="radio" id="retraite" name="status" value="Retraité" class="form-check-input">
                            <label for="retraite" class="form-check-label">Retraité</label>
                        </div>

                        <div v-if="this.activite === 'En activité'" class="form-check form-check-inline">
                            <input v-model="fonction" type="radio" id="fonctionnaire" name="fonction" value="Fonctionnaire" class="form-check-input">
                            <label for="fonctionnaire" class="form-check-label">Fonctionnaire</label>
                        </div>

                        <div v-if="this.activite === 'En activité'" class="form-check form-check-inline">
                            <input v-model="fonction" type="radio" id="contractuelle" name="fonction" value="Contractuelle" class="form-check-input">
                            <label for="contractuelle" class="form-check-label">Contractuelle</label>
                        </div>

                        <div v-if="this.activite === 'Retraité'" class="form-check form-check-inline">
                            <input v-model="fonction" type="radio" id="CPR" name="fonction" value="CPR" class="form-check-input">
                            <label for="fonctionnaire" class="form-check-label">CPR</label>
                        </div>

                        <div v-if="this.activite === 'Retraité'" class="form-check form-check-inline">
                            <input v-model="fonction" type="radio" id="CRCM" name="fonction" value="CRCM" class="form-check-input">
                            <label for="contractuelle" class="form-check-label">CRCM</label>
                        </div>
                    </div>
                    <div class="col-md-4 d-flex">
                        <div class="form-check form-check-inline">
                            <input v-model="plusieursLit" type="checkbox" id="lit" value="pluralite" class="form-check-input">
                            <label for="lit" class="form-check-label">Pluralité de lit</label>                        
                        </div>
                        <input v-model="nbLit" v-if="plusieursLit" type="text" class="form-control" style="width: 40px; height: 25px">
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-md-6">
                        <label for="matricule" class="form-label">Matricule du defunt(e) :</label>
                        <input  v-model="imDefunt" type="text" class="form-control">
                    </div>
                    <div class="col-md-6">
                        <label for="name" class="form-label">Nom et Prenoms du defunt(e) :</label>
                        <input :class="class" v-model="nomDefunt" type="text" class="form-control">
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-md-3">
                        <label for="grade" class="form-label">Grade :</label>
                        <input v-model="grade" type="text" class="form-control" style="width: 10rem;">
                    </div>
                    <div class="col-md-3">
                        <label for="categorie" class="form-label">Categorie :</label>
                        <input v-model="categorie" type="text" class="form-control" style="width: 10rem;">
                    </div>
                    <div class="col-md-3">
                        <label for="indice" class="form-label">Indice :</label>
                        <input v-model="indice" type="text" class="form-control" style="width: 10rem;">
                    </div>

                    <div class="col-md-3">
                        <label for="indice" class="form-label">Année du bareme utilisé :</label>
                        <input v-model="dateBar" type="text" class="form-control" style="width: 10rem;">
                    </div>

                </div>
                <div class="row mb-3">
                    <div class="col-md-6">
                        <label for="budget" class="form-label">Budget :</label>
                        <input v-model="budget" type="text" class="form-control">
                    </div>
                    <div class="col-md-6">
                        <label for="imputation" class="form-label">Imputation budgétaire :</label>
                        <input v-model="imputation" type="text" class="form-control">
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
                    <div class="col-md-12">
                        <label for="adresse" class="form-label">Adresse du bénéficiaire :</label>
                        <input v-model="domicile" type="text" class="form-control">
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-md-4">
                        <label for="dateacte" class="form-label">Date de décès :</label>
                        <input :class="class" v-model="dateDec" type="date" class="form-control" style="width: 10rem;">
                    </div>

                    <div class="col-md-4">
                        <label for="acte" class="form-label">Acte de décès n° :</label>
                        <input v-model="acte" type="text" class="form-control" :class="class" style="width: 10rem;">
                    </div>
                    <div class="col-md-4">
                        <label for="dateacte" class="form-label">du :</label>
                        <input v-model="dateActe" type="date" class="form-control" :class="class" style="width: 10rem;">
                    </div>
                </div>

                <div class="d-flex justify-content-end mt-4">
                    <button type="submit" class="btn btn-success me-5" @click="generateDecision">Aperçu de la décision</button>
                    <button type="button" class="btn btn-success" @click="generateED">Aperçu de l'ED</button>
                </div>
            </form>
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
                                    <p>Titulaire du CIN n° {{ cin }}</p>
                                    <p>du {{ this.datecin !== "" ? formatDate(datecin) : ""}}</p>
                                    <p>Domicilé à {{ domicile.toUpperCase() }}</p>
                                </td>
                                <td class="text-center" style="padding-top: 2rem; font-size: 0.95rem;">
                                    <p>En application {{ decret }} {{ titre }} {{ beneficiaire }} obtient en tant que {{ statut }} un secours au décès,
                                        au montant d' <strong>Ar {{ montant  }}</strong><br>
                                        &lt;&lt; {{ this.nombreEnLettre(montant).toUpperCase()  }} &gt;&gt;<br>
                                        <strong v-if="activite == 'En activité' && !plusieursLit">(
                                        <b v-if="v500 > 0">{{ v500 }} + </b>
                                        <b v-if="v501 > 0">{{ v501 }} + </b>
                                        <b v-if="v502 > 0">{{ v502 }} + </b>
                                        <b v-if="v503 > 0">{{ v503 }} + </b>
                                        <b v-if="v506 > 0">{{ v506 }}</b>
                                        * {{ multi }}) = {{ montant }}
                                        </strong>

                                        <strong v-if="activite == 'En activité' && plusieursLit">
                                        [ ( 
                                        <b v-if="v500 > 0">{{ v500 }} + </b>
                                        <b v-if="v501 > 0">{{ v501 }} + </b>
                                        <b v-if="v502 > 0">{{ v502 }} + </b>
                                        <b v-if="v503 > 0">{{ v503 }} + </b>
                                        <b v-if="v506 > 0">{{ v506 }}</b>
                                         * {{ multi }})  / {{ nbLit }} ] = {{ montant }}
                                        </strong>

                                        <strong v-if="activite == 'Retraité' && !plusieursLit">(
                                        <b v-if="v600 > 0">{{ v600 }} + </b>
                                        <b v-if="v601 > 0">{{ v601 }} + </b>
                                        <b v-if="v602 > 0">{{ v602 }} + </b>
                                        <b v-if="v603 > 0">{{ v603 }} + </b>
                                        <b v-if="v604 > 0">{{ v604 }} + </b>
                                        <b v-if="v605 > 0">{{ v605 }} + </b>
                                        <b v-if="v606 > 0">{{ v606 }} + </b>
                                        <b v-if="v607 > 0">{{ v607 }} + </b>
                                        <b v-if="v608 > 0">{{ v608 }} + </b>
                                        <b v-if="v609 > 0">{{ v609 }} + </b>
                                        <b v-if="v610 > 0">{{ v610 }}</b>
                                         * {{ multi }}) = {{ montant }}
                                        </strong>

                                        <strong v-if="activite == 'Retraité' && plusieursLit">
                                        [(
                                        <b v-if="v600 > 0">{{ v600 }} + </b>
                                        <b v-if="v601 > 0">{{ v601 }} + </b>
                                        <b v-if="v602 > 0">{{ v602 }} + </b>
                                        <b v-if="v603 > 0">{{ v603 }} + </b>
                                        <b v-if="v604 > 0">{{ v604 }} + </b>
                                        <b v-if="v605 > 0">{{ v605 }} + </b>
                                        <b v-if="v606 > 0">{{ v606 }} + </b>
                                        <b v-if="v607 > 0">{{ v607 }} + </b>
                                        <b v-if="v608 > 0">{{ v608 }} + </b>
                                        <b v-if="v609 > 0">{{ v609 }} + </b>
                                        <b v-if="v610 > 0">{{ v610 }}</b>
                                        ) * {{ multi }}] / {{ nbLit }} = {{ montant }}
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

                <p style="margin-top: 2rem;">
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
                            <td>{{ montantMens }}</td>
                        </tr>
                        <tr v-if="!plusieursLit">
                            <td><b>Montant mensuel * {{ multi }} =</b></td>
                            <td>{{ montantMens }} * {{ multi }}</td>
                        </tr>
                        <tr v-else>
                            <td><b>(Montant mensuel * {{ multi }}) / {{ nbLit }} =</b></td>
                            <td>({{ montantMens }} * {{ multi }}) / {{ nbLit }}</td>
                        </tr>
                        <tr>
                            <td><b>Montant du Secours au décès =</b></td>
                            <td>{{ montant }}</td>
                        </tr>
                    </tbody>
                </table>

                <p style="margin-top: 2rem;">
                    <strong>ARRETE LE PRESENT ETAT DE DECOMPTE A LA SOMME DE {{ nombreEnLettre(montant).toUpperCase() }}</strong>
                </p>
                </div>



                </div>
        </div>

        <Transition>
            <div v-if="message" :class="`alert ${messageType}`" role="alert">
            {{ message }}
            </div>
        </Transition>

</template>

<script>
import axios from 'axios';
import n2words from 'n2words';
import html2pdf from 'html2pdf.js'
export default {
    data() {
  return {
    message: "",
    messageType: "",
    nomDefunt: this.$route.query.nomDefunt || "",
    imDefunt: this.$route.query.imDefunt || "",
    budget: "",
    imputation: this.$route.query.imputation || "",
    grade: this.$route.query.grade || "",
    indice: this.$route.query.indice || "",
    beneficiaire: this.$route.query.beneficiaire || "",
    cin: this.$route.query.cin || "",
    datecin: "",
    domicile: "",
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
    dateDec: this.$route.query.dateDec|| "",
    acte: this.$route.query.acte || "",
    dateActe: this.$route.query.dateActe || "",
    statut: this.$route.query.qtbeneficiaire || "",
    plusieursLit: false,
    activite: "",
    fonction: "",
    nbLit: 0,
    categorie: this.$route.query.categorie || '',
    dateBar:'',
    class:'',
  };
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
      return "des dispositions du , ";
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

methods: {
    
    formatNumber(number) {
            return number.toLocaleString(); // Formate le nombre avec un séparateur de milliers
        },
    formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString('fr-FR', {
                day: '2-digit',
                month: 'long',  // ou '2-digit' pour des chiffres
                year: 'numeric'
            });
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

        if(this.beneficiaire !== '' && this.nomDefunt !== '' && this.statut !== '' && this.dateDec !== '' && this.acte !== '' && this.dateActe !== '' ){
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
        }else{
            this.class = 'border-danger'
        }
        },


    async generateED() {

    if(this.beneficiaire !== '' && this.nomDefunt !== '' && this.statut !== '' && this.dateDec !== '' && this.acte !== '' ){
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
    }
    },

    async addSecours() {
        const newSecours = {
            beneficiaire: this.beneficiaire,
            qtbeneficiaire: this.statut,
            matriculedef: this.imDefunt,
            nomdef: this.nomDefunt,
            montant: this.montant,
            cin: this.cin,
            acte: this.acte,
            dateacte: this.dateacte,
        };
        if(this.beneficiaire !== '' && this.nomDefunt !== '' && this.statut !== '' && this.dateDec !== '' && this.acte !== '' ){
        try {
            const response = await axios.post('http://localhost:3000/api/secours', newSecours);
            this.showMessage(response.data.message, 'alert-success'); // Affiche le message de succès
            // Optionnel : Mettre à jour l'affichage ou vider le formulaire ici
        } catch (error) {
            this.showMessage('Erreur lors de l\'ajout du dossier' + error,'alert-danger');
        }
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
};

</script>

<style scoped>

.alert {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1050;
}

</style>