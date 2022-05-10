<template>
  <div class="container">
    <h1 class="text-center">
      Titulacion: {{ $route.params.codigo_titulacion }} - ASIGNATURAS
    </h1>
    <div v-if="datosCargados">
      <table class="table table-striped table-responsive">
        <thead>
          <th>ID</th>
          <th>CARACTER</th>
          <th>CODIGO</th>
          <th>OCURRENCIA</th>
          <th>CREDITOS P</th>
          <th>CREDITOS T</th>
          <th>CURSO</th>
          <th>NOMBRE</th>
          <th>PERIODO</th>
          <th>RESPONSABLE</th>
          <th>TITULACION</th>
        </thead>
        <tbody>
          <tr
            v-for="asignatura in asignaturas"
            v-bind:key="asignatura.id"
            v-on:click="
              navegarAsignatura(
                $route.params.codigo_titulacion,
                asignatura.codigoAsignatura
              )
            "
          >
            <td>{{ asignatura.id }}</td>
            <td>{{ asignatura.caracterAsignatura }}</td>
            <td>{{ asignatura.codigoAsignatura }}</td>
            <td>{{ asignatura.codigoOcurrencia }}</td>
            <td>{{ asignatura.creditosPractica }}</td>
            <td>{{ asignatura.creditosTeoria }}</td>
            <td>{{ asignatura.cursoAsignatura }}</td>
            <td>{{ asignatura.nombreAsignatura }}</td>
            <td>{{ asignatura.periodoAsignatura }}</td>
            <td>{{ asignatura.responsableAsignatura }}</td>
            <td>{{ asignatura.titulacionAsignatura }}</td>
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
import Asignaturas_Service from "../services/Asignaturas_Service";
import ProcesoCarga from "./ProcesoCarga";

export default {
  name: "AsignaturasTitulacionScript",
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
    getAsignaturas(codigo_titulacion) {
      Asignaturas_Service.getAsignaturas(codigo_titulacion).then((response) => {
        this.asignaturas = response.data;
        this.datosCargados = true;
      });
    },
    navegarAsignatura(codigo_titulacion, codigo_asignatura) {
      var ruta =
        "/titulacion/" + codigo_titulacion + "/asignatura/" + codigo_asignatura;
      window.location.href = ruta;
    },
  },
  created() {
    this.getAsignaturas(this.$route.params.codigo_titulacion);
  },
};
</script>
