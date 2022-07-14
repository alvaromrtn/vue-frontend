<template>
  <div class="container">
    <h1 class="text-center">
      <p>CÓDIGO ASIGNATURAS: {{ $route.params.codigo_asignatura }}</p>
      <p>GRUPOS</p>
    </h1>

    <div name="gruposTeoria" v-if="datosCargadosTeoria">
      <div name="graficoGruposTeoria">
        <div v-if="this.datasetTeoria.length !== 0">
          <h2 class="title is-5">GRÁFICO GRUPOS TEORÍA</h2>
          <grupos-asignatura-grafico
            :dataset="this.datasetTeoria"
            :tipoGrafico="this.tipoGraficoTeoria"
            :arrayNumeroProfesores="this.arrayNumeroProfesoresTeoria"
          >
          </grupos-asignatura-grafico>
        </div>
      </div>

      <div name="tablaGruposTeoria">
        <h1 class="text-center">GRUPOS DE TEORÍA</h1>

        <table class="table table-striped table-responsive">
          <thead>
            <th>ID</th>
            <th>C. AULA</th>
            <th>C. GRUPO</th>
            <th>C. PROFESOR</th>
            <th>H. DÍA SEMANA</th>
            <th>H. HORA FIN</th>
            <th>H. HORA INICIO</th>
            <th>N. ASIGNATURA</th>
            <th>N. AULA</th>
            <th>N. EDIFICIO</th>
            <th>N. GRUPO</th>
            <th>N. PROFESOR</th>
            <th>ALUMNOS</th>
            <th>CUATRIMESTRE</th>
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
    <div v-else>
      <ProcesoCarga />
    </div>

    <div name="gruposPractica" v-if="datosCargadosPractica">
      <div name="graficoGruposPractica">
        <div v-if="this.datasetPractica.length !== 0">
          <h2 class="title is-5">GRÁFICO GRUPOS PRÁCTICA</h2>
          <grupos-asignatura-grafico
            :dataset="this.datasetPractica"
            :tipoGrafico="this.tipoGraficoPractica"
            :arrayNumeroProfesores="this.arrayNumeroProfesoresPractica"
          >
          </grupos-asignatura-grafico>
        </div>
      </div>

      <div name="tablaGruposPractica">
        <h1 class="text-center">GRUPOS DE PRÁCTICA</h1>
        <table class="table table-striped table-responsive">
          <thead>
            <th>ID</th>
            <th>C. AULA</th>
            <th>C. GRUPO</th>
            <th>C. PROFESOR</th>
            <th>H. DIA SEMANA</th>
            <th>H. HORA FIN</th>
            <th>H. HORA INICIO</th>
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
    <div v-else>
      <ProcesoCarga />
    </div>
  </div>
</template>

<script>
import Grupos_Service from "../services/Grupos_Service";
import GruposAsignaturaGrafico from "./GruposAsignaturaGrafico";
import ProcesoCarga from "./ProcesoCarga";

import CrearDatasetGrupos_Component from "../components/CrearDatasetGrupos_Component";

export default {
  name: "GruposAsignaturaScript",
  components: {
    GruposAsignaturaGrafico,
    ProcesoCarga,
  },
  data() {
    return {
      gruposTeoria: [],
      gruposPractica: [],
      tipoGraficoTeoria: "",
      tipoGraficoPractica: "",
      datasetTeoria: [],
      datasetPractica: [],
      arrayNumeroProfesoresTeoria: [],
      arrayNumeroProfesoresPractica: [],
      datosCargadosTeoria: false,
      datosCargadosPractica: false,
    };
  },
  methods: {
    getGrupos(codigo_asignatura) {
      Grupos_Service.getGruposTeoria(codigo_asignatura).then((response) => {
        this.gruposTeoria = response.data;

        this.tipoGraficoTeoria = "horizontalBar"; // -> bar | -> line | -> radar | -> polarArea

        this.datasetTeoria = CrearDatasetGrupos_Component.getDataset(
          this.gruposTeoria
        );
        console.log(this.datasetTeoria);
        for (var i = 0; i < this.datasetTeoria.length; i++) {
          this.arrayNumeroProfesoresTeoria.push(i);
        }

        this.datosCargadosTeoria = true;
      });
      Grupos_Service.getGruposPractica(codigo_asignatura).then((response) => {
        this.gruposPractica = response.data;

        this.tipoGraficoPractica = "bar"; // -> bar | -> line | -> radar | -> polarArea

        this.datasetPractica = CrearDatasetGrupos_Component.getDataset(
          this.gruposPractica
        );

        for (var i = 0; i < this.datasetPractica.length; i++) {
          this.arrayNumeroProfesoresPractica.push(i);
        }

        this.datosCargadosPractica = true;
      });
    },
  },
  created() {
    this.getGrupos(this.$route.params.codigo_asignatura);
  },
};
</script>
