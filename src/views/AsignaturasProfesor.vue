<template>
  <div class="container">
    <h1 class="text-center">
      <p>ASIGNATURAS</p>
    </h1>
    <div v-if="datosCargados">
      <table class="table table-striped table-responsive">
        <thead>
          <th>CÓDIGO</th>
          <th>NOMBRE</th>
          <th>CURSO</th>
          <th>CUATRIMESTRE</th>
          <th>CARACTER</th>
          <th>CREDITOS_T</th>
          <th>CREDITOS_P</th>
          <th>TITULACIÓN</th>
          <th>HORAS TOTALES</th>
        </thead>
        <tbody>
          <tr
            v-for="asignatura in asignaturas"
            v-bind:key="asignatura.codigoAsignatura"
          >
            <td>{{ asignatura.codigoAsignatura }}</td>
            <td>{{ asignatura.nombreAsignatura }}</td>
            <td>{{ asignatura.cursoAsignatura }}</td>
            <td>{{ asignatura.periodoAsignatura }}</td>
            <td>{{ asignatura.caracterAsignatura }}</td>
            <td>{{ asignatura.creditosTeoria }}</td>
            <td>{{ asignatura.creditosPractica }}</td>
            <td>{{ asignatura.nombreTitulacion }}</td>
            <td>{{ asignatura.horasTotales }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <ProcesoCarga />
    </div>
  </div>
</template>

<script>
import Asignaturas_Service from "../services/Asignaturas_Service.js";
import ProcesoCarga from "./ProcesoCarga.vue";

export default {
  name: "AsignaturasProfesorScript",
  data() {
    return {
      asignaturas: [],
      datosCargados: false,
    };
  },
  components: {
    ProcesoCarga,
  },
  methods: {
    getAsignaturas(columna_profesor) {
      Asignaturas_Service.getAsignaturasProfesorExcel(columna_profesor).then(
        (response) => {
          this.asignaturas = response.data;
          this.datosCargados = true;
        }
      );
    },
    /*
    navegarAsignatura(codigo_titulacion, codigo_asignatura) {
      var ruta =
        "/titulacion/" + codigo_titulacion + "/asignatura/" + codigo_asignatura;
      this.$router.push(ruta);
    },*/
  },
  created() {
    this.getAsignaturas(this.$route.params.columna_profesor);
  },
};
</script>
