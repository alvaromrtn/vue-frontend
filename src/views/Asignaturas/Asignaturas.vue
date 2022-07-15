<template>
  <main id="asignaturas">
    <br />
    <div class="container">
      <div v-if="datosCargados">
        <TablaAsignaturas :datosTabla="this.asignaturas"></TablaAsignaturas>
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
import TablaAsignaturas from "./TablaAsignaturas.vue";
import ProcesoCarga from "../ProcesoCarga.vue";

export default {
  name: "AsignaturasScript",
  data() {
    return {
      asignaturas: [],
      datosCargados: false,
    };
  },
  components: {
    TablaAsignaturas,
    ProcesoCarga,
  },
  methods: {
    getAsignaturas() {
      Asignaturas_Service.getAsignaturas().then((response) => {
        this.asignaturas = response.data;

        this.asignaturas.sort((a, b) => {
          if (a.nombreTitulacion < b.nombreTitulacion) return -1;

          if (a.nombreTitulacion > b.nombreTitulacion) return 1;
        });

        this.datosCargados = true;
      });
    },
  },
  created() {
    this.getAsignaturas();
  },
};
</script>
