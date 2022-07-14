<template>
  <br />
  <div class="container">
    <div v-if="datosCargados">
      <TablaTitulaciones :datosTabla="this.titulaciones"></TablaTitulaciones>
      <br />
    </div>

    <div v-else>
      <ProcesoCarga />
    </div>
  </div>
</template>

<script>
import Titulaciones_Service from "../../services/Titulaciones_Service";
import TablaTitulaciones from "./TablaTitulaciones";
import ProcesoCarga from "../ProcesoCarga";

export default {
  name: "TitulacionesScript",
  data() {
    return {
      titulaciones: [],
      datosCargados: false,
    };
  },
  components: {
    TablaTitulaciones,
    ProcesoCarga,
  },
  methods: {
    getTitulaciones() {
      Titulaciones_Service.getTitulaciones().then((response) => {
        this.titulaciones = response.data;

        this.titulaciones.sort((a, b) => {
          if (a.codigo < b.codigo) return -1;

          if (a.codigo > b.codigo) return 1;
        });

        this.datosCargados = true;
      });
    },
  },
  created() {
    this.getTitulaciones();
  },
};
</script>
