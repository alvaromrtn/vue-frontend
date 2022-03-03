<template>
  <div class="container">
    <h1 class="text-center">Lista de Titulaciones</h1>
    <table class="table table-striped">
      <thead>
        <th>ID</th>
        <th>NOMBRE</th>
        <th>APELLIDO</th>
        <th>CORREO</th>
      </thead>
      <tbody>
        <tr v-for="profesor in profesores" v-bind:key="profesor.id">
          <td>{{ profesor.id }}</td>
          <td>{{ profesor.nombre }}</td>
          <td>{{ profesor.apellidos }}</td>
          <td>{{ profesor.correo }}</td>
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
      profesores: [],
    };
  },
  methods: {
    getTitulaciones() {
      Titulacion_Service.getTitulaciones().then((response) => {
        this.profesores = response.data;
      });
    },
  },
  created() {
    this.getTitulaciones();
  },
};
</script>