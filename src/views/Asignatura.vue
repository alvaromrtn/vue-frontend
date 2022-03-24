<template>
  <div class="container">
    <h1 class="text-center">
      codigo asignatura: {{ $route.params.codigo_asignatura }} - GRUPOS
    </h1>

    <div name="teoria">
      <h1 class="text-center">GRUPOS DE TEORÍA</h1>

      <table class="table table-striped">
        <thead>
          <th>ID</th>
          <th>C. AULA</th>
          <th>C. GRUPO</th>
          <th>C. PROFESOR</th>
          <th>H. DIA SEMANA</th>
          <th>H. HORA FIN</th>
          <th>H. HORA INICIO</th>
          <th>H. QUINCENAL</th>
          <th>N. ASIGNATURA</th>
          <th>N. AULA</th>
          <th>N. EDIFICIO</th>
          <th>N. GRUPO</th>
          <th>N. PROFESOR</th>
          <th>ALUMNOS</th>
          <th>PERIODO</th>
        </thead>
        <tbody>
          <tr v-for="grupo in gruposTeoria" v-bind:key="grupo.id">
            <td>{{ grupo.id }}</td>
            <td>{{ grupo.codigoAula }}</td>
            <td>{{ grupo.codigoGrupo }}</td>
            <td>{{ grupo.codigoProfesor }}</td>
            <td>{{ grupo.horarioDiaSemana }}</td>
            <td>{{ grupo.horarioHoraFin }}</td>
            <td>{{ grupo.horarioHoraInicio }}</td>
            <td>{{ grupo.horarioQuincenal }}</td>
            <td>{{ grupo.nombreAsignatura }}</td>
            <td>{{ grupo.nombreAula }}</td>
            <td>{{ grupo.nombreEdificio }}</td>
            <td>{{ grupo.nombreGrupo }}</td>
            <td>{{ grupo.nombreProfesor }}</td>
            <td>{{ grupo.numeroAlumnos }}</td>
            <td>{{ grupo.periodo }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div name="practica">
      <h1 class="text-center">GRUPOS DE PRÁCTICA</h1>

      <table class="table table-striped">
        <thead>
          <th>ID</th>
          <th>C. AULA</th>
          <th>C. GRUPO</th>
          <th>C. PROFESOR</th>
          <th>H. DIA SEMANA</th>
          <th>H. HORA FIN</th>
          <th>H. HORA INICIO</th>
          <th>H. QUINCENAL</th>
          <th>N. ASIGNATURA</th>
          <th>N. AULA</th>
          <th>N. EDIFICIO</th>
          <th>N. GRUPO</th>
          <th>N. PROFESOR</th>
          <th>ALUMNOS</th>
          <th>PERIODO</th>
        </thead>
        <tbody>
          <tr v-for="grupo in gruposPractica" v-bind:key="grupo.id">
            <td>{{ grupo.id }}</td>
            <td>{{ grupo.codigoAula }}</td>
            <td>{{ grupo.codigoGrupo }}</td>
            <td>{{ grupo.codigoProfesor }}</td>
            <td>{{ grupo.horarioDiaSemana }}</td>
            <td>{{ grupo.horarioHoraFin }}</td>
            <td>{{ grupo.horarioHoraInicio }}</td>
            <td>{{ grupo.horarioQuincenal }}</td>
            <td>{{ grupo.nombreAsignatura }}</td>
            <td>{{ grupo.nombreAula }}</td>
            <td>{{ grupo.nombreEdificio }}</td>
            <td>{{ grupo.nombreGrupo }}</td>
            <td>{{ grupo.nombreProfesor }}</td>
            <td>{{ grupo.numeroAlumnos }}</td>
            <td>{{ grupo.periodo }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Grupos_Service from "../services/Grupos_Service";

export default {
  name: "TitulacionScript",
  data() {
    return {
      gruposTeoria: [],
      gruposPractica: [],
    };
  },
  methods: {
    getGrupos() {
      Grupos_Service.getGruposTeoria(this.$route.params.codigo_asignatura).then(
        (response) => {
          this.gruposTeoria = response.data;
          console.log("A: ", this.gruposTeoria);
        }
      );
      Grupos_Service.getGruposPractica(
        this.$route.params.codigo_asignatura
      ).then((response) => {
        this.gruposPractica = response.data;
      });
    },
  },
  created() {
    this.getGrupos(this.$route.params.codigo_asignatura);
  },
};
</script>