<template>
  <main id="profesores" style="width: 1000px">
    <div v-if="nombreAsignaturaCargado">
      <h1>
        {{ this.nombreAsignatura }}
      </h1>
      <br />
    </div>
    <div class="container">
      <div v-if="datosCargados">
        <h2>ASIGNATURAS</h2>
        <br />
        <TablaProfesoresAsignatura
          :datosTabla="this.profesores"
        ></TablaProfesoresAsignatura>
        <br />
        <div v-if="datosGrafico.series.length != 0">
          <h4>GRÁFICO SEGÚN EL NÚMERO DE HORAS POR PROFESOR</h4>
          <GraficoProfesoresAsignatura
            :datos="this.datosGrafico"
          ></GraficoProfesoresAsignatura>
        </div>
      </div>
      <div v-else>
        <ProcesoCarga />
      </div>
    </div>
  </main>
</template>

<script>
import Profesores_Service from "../../services/Profesores_Service.js";
import Asignaturas_Service from "../../services/Asignaturas_Service.js";
import TablaProfesoresAsignatura from "./TablaProfesoresAsignatura.vue";
import GraficoProfesoresAsignatura from "./GraficoProfesoresAsignatura.vue";
import DatasetGraficoDonut from "../../components/DatasetGraficoDonut_Component.js";
import ProcesoCarga from "../ProcesoCarga.vue";

export default {
  name: "ProfesoresScript",
  data() {
    return {
      profesores: [],
      datosCargados: false,
      nombreAsignatura: "",
      nombreAsignaturaCargado: false,
      datosGrafico: {},
    };
  },
  components: {
    TablaProfesoresAsignatura,
    GraficoProfesoresAsignatura,
    ProcesoCarga,
  },
  methods: {
    getProfesoresAsignatura(id) {
      Profesores_Service.getProfesoresAsignatura(id).then((response) => {
        this.profesores = response.data;

        this.profesores.sort((a, b) => {
          if (a.horas < b.horas) return 1;

          if (a.horas > b.horas) return -1;
        });

        this.datosGrafico = DatasetGraficoDonut.getDataset();

        let listaProfesores = [];
        let listaHoras = [];
        for (let i = 0; i < this.profesores.length; i++) {
          listaProfesores[i] = this.profesores[i].nombre;
          listaHoras[i] = this.profesores[i].horas;
        }

        this.datosGrafico.options.labels = listaProfesores;
        this.datosGrafico.series = listaHoras;

        this.datosCargados = true;
      });
    },
    getAsignaturaNombre(id) {
      Asignaturas_Service.getAsignaturaNombre(id).then((response) => {
        this.nombreAsignatura = response.data;

        this.nombreAsignaturaCargado = true;
      });
    },
  },
  created() {
    this.getProfesoresAsignatura(this.$route.params.id);
    this.getAsignaturaNombre(this.$route.params.id);
  },
};
</script>
