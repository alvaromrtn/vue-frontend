<template>
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
</template>

<script>
import Asignaturas_Service from "../../services/Asignaturas_Service";
import TablaAsignaturas from "./TablaAsignaturas";
import ProcesoCarga from "../ProcesoCarga";

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

        this.datosCargados = true;
      });
    },
  },
  created() {
    this.getAsignaturas();
  },
};
</script>
