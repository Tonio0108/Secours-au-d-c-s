
<template>
  <div class="d-flex mt-5">
    <div class="col-6 mx-auto shadow rounded-4">
      <h4 class="text-center mt-3">Agents de l'Etat</h4>

      <div class="row d-flex mt-4 text-center" id="stat">
        <div class="col-3 mx-auto shadow bg-primary rounded-4 text-light">
          <h6>
            <b>en service</b>
          </h6>
          <span>{{ active.length ? active[0].nbactive : 0 }}</span>
        </div>
        <div class="col-3 mx-auto shadow bg-dark rounded-4">
          <h6><b>retraité</b></h6>
          <span>{{ retraite.length ? retraite[0].nbretraite : 0 }}</span>
        </div>
        <div class="col-3 mx-auto shadow bg-danger rounded-4">
          <h6><b>TOTAL</b></h6>
          <span>{{ totalAgents }}</span>
        </div>
      </div>

      <div class="row d-flex mt-3" id="pourcent">
        <div class="col-3 d-flex">
          <h6><b><span>{{ activePercentage }}%</span> </b></h6>
        </div>

        <div class="col-3 d-flex">
          <h6 class="ms-3"><b><span>{{ retraitePercentage }}%</span> </b></h6>
        </div>
      </div>
    </div>

    <div class="col-3 mx-auto shadow text-center rounded-4">
      <h4 class="mt-3">Secours au décès</h4>
      <div class="row d-flex mt-4" id="stat">
        <div class="col-7 mx-auto shadow bg-success rounded-4">
          <h6><b>Dossiers traités cette année</b></h6>
          <span>{{dossiers.length ? dossiers[0].nbdossier : 0}}</span>
        </div>
      </div>
    </div>
  </div>

  <div  class="mt-4 col-9 mx-auto text-center" style="height: 30rem;">
    <h4>Representation graphiques du secours au décès</h4>
    <canvas id="courbe" style="width: 100%; height: 100%;"></canvas>
  </div>
</template>

<script>
import axios from 'axios';

import Chart  from 'chart.js/auto';
  
export default {
  data() {
    return {
      active: [], 
      retraite: [],
      dossiers:[],
      width: 500,
      height:170
    };
  },
  computed: {
    totalAgents() {
      if (this.active.length && this.retraite.length) {
        return Number(this.active[0].nbactive) + Number(this.retraite[0].nbretraite);
      }
      return 0;
    },

    activePercentage() {
      if (this.totalAgents > 0) {
        return ((Number(this.active[0].nbactive) / this.totalAgents) * 100).toFixed(2);
      }
      return 0;
    },
    retraitePercentage() {
      if (this.totalAgents > 0) {
        return ((Number(this.retraite[0].nbretraite) / this.totalAgents) * 100).toFixed(2);
      }
      return 0;
    },
  },
  methods: {
    async countActive() {
      try {
        const res = await axios.get('http://192.168.0.109:3000/api/stat/active');
        this.active = res.data;
        console.log(this.active[0].nbactive);
      } catch (error) {
        console.log(error);
      }
    },
    async countRetraite() {
      try {
        const res = await axios.get('http://192.168.0.109:3000/api/stat/retraite');
        this.retraite = res.data;
        console.log(this.retraite[0].nbretraite);
      } catch (error) {
        console.log(error);
      }
    },

    async countDossiers() {
      try {
        const res = await axios.get('http://192.168.0.109:3000/api/stat/secours');
        this.dossiers = res.data;
        console.log(this.dossiers[0].nbdossier);
      } catch (error) {
        console.log(error);
      }
    },
    async courbe() {
    try {
      // Récupérer les données depuis l'API
      const response = await fetch('http://192.168.0.109:3000/api/stat/month');
      const result = await response.json();
      const response2 = await fetch('http://192.168.0.109:3000/api/stat/month2');
      const result2 = await response2.json();
      // Extraire les valeurs des dossiers traités (nombre)
      const dataFromAPI = result.map(item => item.nombre); // Tableau des nombres par mois
      const dataFromAPI2 = result2.map(item => item.nombre)

      const labels = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet','Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
      const data = {
        labels: labels,
        datasets: [
          {
          label: 'Dossiers traités cette année',
          data: dataFromAPI,
          fill: false,
          borderColor: 'rgb(75, 192, 192)', 
          tension: 0.1
        },

        {
          label: `Dossiers traités l'année dernière`,
          data: dataFromAPI2,
          fill: false,
          borderColor: 'rgb(180, 0, 0)', 
          tension: 0.1
        }

      ]
      };

      const ctx = document.getElementById('courbe').getContext('2d');

      //instance de chartJs pour le graph
      new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
          scales: {
            y: {
              beginAtZero: true, 
              max: 10,           
            }
          }
        }
      });
  } catch (error) {
      console.error('Erreur lors de la récupération des données :', error);
    }
  }

  },
  mounted() {

    //appel des methodes une fois que le composant est monté
  this.countActive()
  this.countRetraite()
  this.countDossiers()
  this.courbe()
}

};
</script>
