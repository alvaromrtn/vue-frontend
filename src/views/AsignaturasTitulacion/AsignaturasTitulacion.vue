<template>
  <div class="container">
    <div v-if="datosCargados">
      <h1 class="text-center">
        <p>
          {{ this.asignaturas[0].titulacionAsignatura }}
        </p>
        <p>
          {{ $t("asignaturas.asignaturas") }}
        </p>
      </h1>
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
</template>

<script>
import Asignaturas_Service from "../../services/Asignaturas_Service";
import TablaAsignaturasTitulacion from "./TablaAsignaturasTitulacion";
import ProcesoCarga from "../ProcesoCarga";

export default {
  name: "AsignaturasTitulacionScript",
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
    getAsignaturas(codigo_titulacion) {
      Asignaturas_Service.getAsignaturasTitulacion(codigo_titulacion).then(
        (response) => {
          this.asignaturas = response.data;

          this.datosCargados = true;
        }
      );
    },
  },
  created() {
    this.getAsignaturas(this.$route.params.codigo_titulacion);
  },
};
</script>
