<template>
  <br />
  <div class="container">
    <div v-if="datosCargados">
      <TablaProfesores :datosTabla="this.profesores"></TablaProfesores>
      <br />
      <GraficoProfesores :datos="this.datosGrafico"></GraficoProfesores>
    </div>
    <div v-else>
      <ProcesoCarga />
    </div>
  </div>
</template>

<script>
import Profesor_Service from "../../services/Profesor_Service";
import TablaProfesores from "./TablaProfesores";
import GraficoProfesores from "./GraficoProfesores";
import CrearDatasetProfesores_Component from "../../components/CrearDatasetProfesores_Component";
import ProcesoCarga from "../ProcesoCarga";

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
      Profesor_Service.getProfesores().then((response) => {
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
