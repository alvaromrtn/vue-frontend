<template>
  <main id="asignaturasIitulacion" style="width: 1000px">
    <div class="container">
      <div v-if="datosCargados">
        <h1>
          {{ this.asignaturas[0].titulacionAsignatura }}
        </h1>
        <br />
        <h2>ASIGNATURAS</h2>
        <br />
        <TablaAsignaturasTitulacion
          :datosTabla="this.asignaturas"
          :codigoTitulacion="this.$route.params.codigo_titulacion"
        ></TablaAsignaturasTitulacion>
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
import TablaAsignaturasTitulacion from "./TablaAsignaturasTitulacion.vue";
import ProcesoCarga from "../ProcesoCarga.vue";

export default {
  name: "AsignaturasTitulacionScript",
  watch: {
    title: {
      immediate: true,
      handler() {
        document.title = "Asignaturas Titulación";
      },
    },
  },
  data() {
    return {
      asignaturas: [],
      datosCargados: false,
    };
  },
  components: {
    TablaAsignaturasTitulacion,
    ProcesoCarga,
  },
  methods: {
    getAsignaturasTitulacion(codigo_titulacion) {
      Asignaturas_Service.getAsignaturasTitulacion(codigo_titulacion).then(
        (response) => {
          this.asignaturas = response.data;

          this.asignaturas.sort((a, b) => {
            if (a.codigoAsignatura < b.codigoAsignatura) return -1;

            if (a.codigoAsignatura > b.codigoAsignatura) return 1;
          });

          this.datosCargados = true;
        }
      );
    },
  },
  created() {
    this.getAsignaturasTitulacion(this.$route.params.codigo_titulacion);
  },
};
</script>
