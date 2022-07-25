<template>
  <main id="profesores" style="width: 1000px">
    <div v-if="nombreAsignaturaCargado">
      <h1>
        {{ this.nombreProfesor }}
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
      </div>
      <div v-else>
        <ProcesoCarga />
      </div>
    </div>
  </main>
</template>

<script>
import Profesores_Service from "../../services/Profesores_Service.js";
import TablaProfesoresAsignatura from "./TablaProfesoresAsignatura.vue";
import ProcesoCarga from "../ProcesoCarga.vue";

export default {
  name: "ProfesoresScript",
  data() {
    return {
      profesores: [],
      datosGrafico: {},
      datosCargados: false,
      nombreAsignaturaCargado: false,
    };
  },
  components: {
    TablaProfesoresAsignatura,
    ProcesoCarga,
  },
  methods: {
    getProfesoresAsignatura(id) {
      Profesores_Service.getProfesoresAsignatura(id).then((response) => {
        this.profesores = response.data;

        this.datosCargados = true;
      });
    },
  },
  created() {
    this.getProfesoresAsignatura(this.$route.params.id);
  },
};
</script>
