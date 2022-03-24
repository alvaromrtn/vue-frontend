<template>
  <div class="container">
    <h1 class="text-center">
      Titulacion: {{ $route.params.codigo }} - ASIGNATURAS
    </h1>
    <table class="table table-striped">
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
          v-on:click="navegarAsignatura(asignatura.codigoAsignatura)"
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
</template>

<script>
import Titulacion_Service from "../services/Titulacion_Service";

export default {
  name: "TitulacionScript",
  data() {
    return {
      asignaturas: [],
    };
  },
  methods: {
    getAsignaturas() {
      Titulacion_Service.getAsignaturas(this.$route.params.codigo).then(
        (response) => {
          this.asignaturas = response.data;
        }
      );
    },
    navegarAsignatura(codigo) {
      var ruta =
        "/titulacion/" + this.$route.params.codigo + "/asignatura/" + codigo;
      window.location.href = ruta;
    },
  },
  created() {
    this.getAsignaturas(this.$route.params.codigo);
  },
};
</script>