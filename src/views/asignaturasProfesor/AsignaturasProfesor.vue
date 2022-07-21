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
import ProcesoCarga from "../ProcesoCarga.vue";

export default {
  name: "AsignaturasProfesorScript",
  data() {
    return {
      asignaturas: [],
      datosCargados: false,
      nombreProfesor: "",
      nombreProfesorCargado: false,
    };
  },
  components: {
    TablaAsignaturasProfesor,
    ProcesoCarga,
  },
  methods: {
    getAsignaturasProfesor(columna_profesor) {
      Asignaturas_Service.getAsignaturasProfesor(columna_profesor).then(
        (response) => {
          this.asignaturas = response.data;

          this.asignaturas.sort((a, b) => {
            if (a.nombreTitulacion < b.nombreTitulacion) return -1;

            if (a.nombreTitulacion > b.nombreTitulacion) return 1;
          });

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
