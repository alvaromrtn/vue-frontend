<template>
  <div class="container">
    <h1 class="text-center">PROFESORES</h1>

    <div v-if="datosCargados">
      <div id="grafico">
        <ProfesoresGrafico :datos="this.datosGrafico"></ProfesoresGrafico>
      </div>
      <table class="table table-striped table-responsive">
        <thead>
          <th>ID</th>
          <th>NOMBRE</th>
          <th>APELLIDOS</th>
          <th>CORREO</th>
        </thead>
        <tbody>
          <tr
            v-for="profesor in profesores"
            v-bind:key="profesor.id"
            v-on:click="navegarProfesor(profesor.id)"
          >
            <td>{{ profesor.id }}</td>
            <td>{{ profesor.nombre }}</td>
            <td>{{ profesor.apellidos }}</td>
            <td>{{ profesor.horas }}</td>
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
import Profesor_Service from "../services/Profesor_Service";
import CrearDatasetProfesores_Component from "../components/CrearDatasetProfesores_Component";
import ProfesoresGrafico from "./ProfesoresGrafico";
import ProcesoCarga from "./ProcesoCarga";

export default {
  name: "ProfesoresScript",
  data() {
    return {
      profesores: [],
      datosGrafico: {},
      datosCargados: false,
    };
  },
  components: {
    ProfesoresGrafico,
    ProcesoCarga,
  },
  methods: {
    getProfesores() {
      Profesor_Service.getProfesores().then((response) => {
        this.profesores = response.data;

        this.datosGrafico = CrearDatasetProfesores_Component.getDataset();

        let listaProfesores = [];
        let listaHoras = [];

        for (let i = 0; i < this.profesores.length; i++) {
          listaProfesores[i] = this.profesores[i].nombre;
          listaHoras[i] = this.profesores[i].horas;
        }

        this.datosGrafico.profesores = listaProfesores;
        this.datosGrafico.horas = listaHoras;

        this.datosGrafico.options.xaxis.categories = listaProfesores;
        this.datosGrafico.series[0].data = listaHoras;

        this.datosCargados = true;
      });
    },
    navegarProfesor(columna_profesor) {
      var ruta = "/profesor/" + columna_profesor;
      this.$router.push(ruta);
    },
  },
  created() {
    this.getProfesores();
  },
};
</script>
