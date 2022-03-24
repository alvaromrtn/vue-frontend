<template>
  <div class="container">
    <h1 class="text-center">Lista de Titulaciones</h1>
    <table class="table table-striped">
      <thead>
        <th>ID</th>
        <th>CENTRO</th>
        <th>CODIGO</th>
        <th>NOMBRE</th>
        <th>CURSOS</th>
      </thead>
      <tbody>
        <tr
          v-for="titulacion in titulaciones"
          v-bind:key="titulacion.id"
          v-on:click="navegarTitulacion(titulacion.codigo)"
        >
          <td>{{ titulacion.id }}</td>
          <td>{{ titulacion.centro }}</td>
          <td>{{ titulacion.codigo }}</td>
          <td>{{ titulacion.nombre }}</td>
          <td>{{ titulacion.numeroCursos }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Titulaciones_Service from "../services/Titulaciones_Service";

export default {
  name: "TitulacionesScript",
  data() {
    return {
      titulaciones: [],
    };
  },
  methods: {
    getTitulaciones() {
      Titulaciones_Service.getTitulaciones().then((response) => {
        this.titulaciones = response.data;
      });
    },
    navegarTitulacion(codigo) {
      var ruta = "/titulacion/" + codigo;
      window.location.href = ruta;
    },
  },
  created() {
    this.getTitulaciones();
  },
};
</script>