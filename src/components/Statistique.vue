
<template>
  <header class="" style="width: 100%;">
    <h3 id="title">Statistique</h3>
    <img id="logo2" src="../assets/Logo_hd_MEF-PETIT-2.png" alt="" width="130px" height="80px">
  </header>

  <div class="d-flex mt-5">
    <div class="col-6 shadow">
      <h5 class="title2">Agents de l'Etat</h5>

      <div class="row d-flex mt-4" id="stat">
        <div class="col-3 shadow bg-primary rounded-4">
          <h6><b>en service</b></h6>
          <span>{{ active.length ? active[0].nbactive : 0 }}</span> <!-- Gérer les données avant leur chargement -->
        </div>
        <div class="col-3 shadow bg-dark rounded-4">
          <h6><b>retraité</b></h6>
          <span>{{ retraite.length ? retraite[0].nbretraite : 0 }}</span> <!-- Gérer les données avant leur chargement -->
        </div>
        <div class="col-3 shadow bg-danger rounded-4">
          <h6><b>TOTAL</b></h6>
          <span>{{ totalAgents }}</span>
        </div>
      </div>

      <div class="row d-flex mt-4" id="pourcent">
        <div class="col-3 d-flex">
          <h6><b>en activité :<span>{{  }}</span> </b></h6>
        </div>

        <div class="col-3 d-flex">
          <h6><b>retraité :<span>0%</span> </b></h6>
        </div>
      </div>
    </div>

    <div class="col-3 shadow">
      <h5 class="title3">Secours au décès</h5>
      <div class="row d-flex" id="stat">
        <div class="col-7 shadow bg-success rounded-4" id="dossiers">
          <h6><b>Dossiers traité cette année</b></h6>
          <span>0</span>
        </div>
      </div>
    </div>
  </div>

  <div id="graph" class="mt-4 shadow">
    <h5>Representation graphiques du secours au décès</h5>
    <div class="col-9 shadow" style="height: 29rem; margin-left: 11rem;">
      <!-- Graphique ici -->
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      active: [], // Initialisé comme tableau vide
      retraite: [], // Initialisé comme tableau vide
    };
  },
  computed: {
    totalAgents() {
      if (this.active.length && this.retraite.length) {
        return Number(this.active[0].nbactive) + Number(this.retraite[0].nbretraite);
      }
      return 0;
    },
  },
  methods: {
    formatNumber(number) {
      return number.toLocaleString(); // Formate le nombre avec un séparateur de milliers
    },
    async countActive() {
      try {
        const res = await axios.get('http://localhost:3000/api/stat/active');
        this.active = res.data;
        console.log(this.active[0].nbactive);
      } catch (error) {
        console.log(error);
      }
    },
    async countRetraite() {
      try {
        const res = await axios.get('http://localhost:3000/api/stat/retraite');
        this.retraite = res.data;
        console.log(this.retraite[0].nbretraite);
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.countActive();
    this.countRetraite();
  },
};
</script>
