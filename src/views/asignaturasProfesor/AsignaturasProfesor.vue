<template>
  <main id="asignaturasProfesor" style="width: 1000px">
    <div v-if="nombreProfesorCargado">
      <h1>
        {{ this.nombreProfesor }}
      </h1>
      <br />
    </div>
    <div class="container">
      <div v-if="datosCargados">
        <h2>ASIGNATURAS</h2>
        <br />
        <TablaAsignaturasProfesor
          :datosTabla="this.asignaturas"
        ></TablaAsignaturasProfesor>
        <br />

        <div v-if="this.horasTotales != 0">
          <p>
            Horas totales: <b>{{ this.horasTotales }}</b>
          </p>
        </div>
        <br />

        <div v-if="datosGrafico.series.length != 0">
          <h4>GRÁFICO SEGÚN EL NÚMERO DE HORAS POR ASIGNATURA</h4>
          <GraficoAsignaturasProfesor
            :datos="this.datosGrafico"
          ></GraficoAsignaturasProfesor>
        </div>
      </div>
      <div v-else>
        <ProcesoCarga />
      </div>
    </div>
  </main>
</template>

<script>
import Asignaturas_Service from "../../services/Asignaturas_Service.js";
import Profesores_Service from "../../services/Profesores_Service.js";
import TablaAsignaturasProfesor from "./TablaAsignaturasProfesor.vue";
import GraficoAsignaturasProfesor from "./GraficoAsignaturasProfesor.vue";
import DatasetGraficoDonut from "../../components/DatasetGraficoDonut_Component.js";
import ProcesoCarga from "../ProcesoCarga.vue";

export default {
  name: "AsignaturasProfesorScript",
  watch: {
    title: {
      immediate: true,
      handler() {
        document.title = "Asignaturas Profesor";
      },
    },
  },
  data() {
    return {
      asignaturas: [],
      datosCargados: false,
      nombreProfesor: "",
      nombreProfesorCargado: false,
      datosGrafico: {},
      horasTotales: 0,
    };
  },
  components: {
    TablaAsignaturasProfesor,
    GraficoAsignaturasProfesor,
    ProcesoCarga,
  },
  methods: {
    getAsignaturasProfesor(columna_profesor) {
      Asignaturas_Service.getAsignaturasProfesor(columna_profesor).then(
        (response) => {
          this.asignaturas = response.data;

          this.asignaturas.sort((a, b) => {
            if (a.horasTotales < b.horasTotales) return 1;

            if (a.horasTotales > b.horasTotales) return -1;
          });

          this.datosGrafico = DatasetGraficoDonut.getDataset();

          let listaAsignaturas = [];
          let listaHoras = [];
          for (let i = 0; i < this.asignaturas.length; i++) {
            listaAsignaturas[i] = this.asignaturas[i].nombreAsignatura;
            listaHoras[i] = this.asignaturas[i].horasTotales;
            this.horasTotales =
              this.horasTotales + this.asignaturas[i].horasTotales;
          }

          this.datosGrafico.options.labels = listaAsignaturas;
          this.datosGrafico.series = listaHoras;

          this.datosCargados = true;
        }
      );
    },
    getProfesorNombre(columna_profesor) {
      Profesores_Service.getProfesorNombre(columna_profesor).then(
        (response) => {
          this.nombreProfesor = response.data;

          this.nombreProfesorCargado = true;
        }
      );
    },
  },
  created() {
    this.getAsignaturasProfesor(this.$route.params.columna_profesor);
    this.getProfesorNombre(this.$route.params.columna_profesor);
  },
};
</script>
