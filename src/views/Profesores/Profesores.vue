<template>
  <main id="profesores">
    <h1>PROFESORES</h1>
    <br />
    <div class="container">
      <div v-if="datosCargados">
        <TablaProfesores :datosTabla="this.profesores"></TablaProfesores>
        <br />
        <br />
        <h2>GRÁFICO SEGÚN HORAS POR PROFESOR</h2>
        <GraficoProfesores :datos="this.datosGrafico"></GraficoProfesores>
      </div>
      <div v-else>
        <ProcesoCarga />
      </div>
    </div>
  </main>
</template>

<script>
import Profesores_Service from "../../services/Profesores_Service.js";
import TablaProfesores from "./TablaProfesores.vue";
import GraficoProfesores from "./GraficoProfesores.vue";
import CrearDatasetProfesores_Component from "../../components/CrearDatasetProfesores_Component.js";
import ProcesoCarga from "../ProcesoCarga.vue";

export default {
  name: "ProfesoresScript",
  data() {
    return {
      profesores: [],
      datosGrafico: {},
      datosCargados: false,
    };
  },
  components: {
    TablaProfesores,
    GraficoProfesores,
    ProcesoCarga,
  },
  methods: {
    getProfesores() {
      Profesores_Service.getProfesores().then((response) => {
        this.profesores = response.data;

        this.profesores.sort((a, b) => {
          if (a.horas < b.horas) return 1;

          if (a.horas > b.horas) return -1;
        });

        this.datosGrafico = CrearDatasetProfesores_Component.getDataset();

        let listaProfesores = [];
        let listaHoras = [];

        for (let i = 0; i < this.profesores.length; i++) {
          listaProfesores[i] = this.profesores[i].nombreCompleto;
          listaHoras[i] = this.profesores[i].horas;
        }

        this.datosGrafico.options.xaxis.categories = listaProfesores;
        this.datosGrafico.series[0].data = listaHoras;

        this.datosCargados = true;
      });
    },
  },
  created() {
    this.getProfesores();
  },
};
</script>
