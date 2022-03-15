<template>
  <div class="container">
    <h1 class="text-center">Lista de Profesores</h1>
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

  <div id="otro_componente_prueba">
    <Titulacion />
  </div>
</template>

<script>
import Profesor_Service from "../services/Profesor_Service";
import Titulacion from "./Titulaciones.vue";

export default {
  name: "ProfesorScript",
  data() {
    return {
      profesores: [],
    };
  },
  components: {
    Titulacion,
  },
  methods: {
    getProfesores() {
      Profesor_Service.getProfesores().then((response) => {
        this.profesores = response.data;
      });
    },
  },
  created() {
    this.getProfesores();
  },
};
</script>
