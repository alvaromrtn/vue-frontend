<template>
  <main id="asignaturasProfesor">
    <br />
    <div class="container">
      <div v-if="datosCargados">
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
import TablaAsignaturasProfesor from "./TablaAsignaturasProfesor.vue";
import ProcesoCarga from "../ProcesoCarga.vue";

export default {
  name: "AsignaturasProfesorScript",
  data() {
    return {
      asignaturas: [],
      datosCargados: false,
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
  },
  created() {
    this.getAsignaturasProfesor(this.$route.params.columna_profesor);
  },
};
</script>
