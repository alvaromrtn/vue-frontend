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
        </div>
      </div>

      <div id="grafico">
        <GruposGrafico :datos="this.datosGrafico"></GruposGrafico>
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
        </div>
      </div>

      <div id="grafico">
        <GruposGrafico :datos="this.datosGrafico2"></GruposGrafico>
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
import Grupos_Service from "../services/Grupos_Service.js";
import ProcesoCarga from "./ProcesoCarga.vue";

import GruposGrafico from "./GruposGrafico.vue";

export default {
  name: "GruposAsignaturaScript",
  components: {
    ProcesoCarga,
    GruposGrafico,
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

      ////////

      datosGrafico: {
        options: {
          labels: [],
          chart: {
            type: "donut",
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200,
                },
                legend: {
                  position: "bottom",
                },
              },
            },
          ],
        },
        series: [],
      },

      datosGrafico2: {
        options: {
          labels: [],
          chart: {
            type: "donut",
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200,
                },
                legend: {
                  position: "bottom",
                },
              },
            },
          ],
        },
        series: [],
      },
      ////////
    };
  },
  methods: {
    getGrupos(codigo_asignatura) {
      Grupos_Service.getGruposTeoria(codigo_asignatura).then((response) => {
        this.gruposTeoria = response.data;

        this.tipoGraficoTeoria = "horizontalBar"; // -> bar | -> line | -> radar | -> polarArea

        console.log(this.datasetTeoria);
        for (var i = 0; i < this.datasetTeoria.length; i++) {
          this.arrayNumeroProfesoresTeoria.push(i);
        }
        ////////////////////

        let listaProfesores = [];
        let listaHoras = [];
        let listaNombreGrupo = [];

        let array = [];

        for (let i = 0; i < this.gruposTeoria.length; i++) {
          let object = new Object();

          object.profesor = this.gruposTeoria[i].nombreProfesor;
          object.horas = this.gruposTeoria[i].numeroAlumnos;
          object.grupo = this.gruposTeoria[i].nombreGrupo;

          array.push(object);

          listaProfesores[i] = this.gruposTeoria[i].nombreProfesor;
          listaHoras[i] = this.gruposTeoria[i].numeroAlumnos;
          listaNombreGrupo[i] = this.gruposTeoria[i].nombreGrupo;
        }

        let hash = {};
        array = array.filter((o) =>
          hash[o.grupo] ? false : (hash[o.grupo] = true)
        );

        console.log(JSON.stringify(array));

        ////////////////

        this.datosGrafico.options.labels = listaProfesores;
        this.datosGrafico.series = listaHoras;

        //grupo.nombreGrupo

        ////////////////////

        this.datosCargadosTeoria = true;
      });
      Grupos_Service.getGruposPractica(codigo_asignatura).then((response) => {
        this.gruposPractica = response.data;

        this.tipoGraficoPractica = "bar"; // -> bar | -> line | -> radar | -> polarArea

        for (var i = 0; i < this.datasetPractica.length; i++) {
          this.arrayNumeroProfesoresPractica.push(i);
        }

        /////////////

        let listaProfesores = [];
        let listaHoras = [];
        let listaNombreGrupo = [];
        /*
        for (let i = 0; i < this.gruposTeoria.length; i++) {
          listaProfesores[i] = this.gruposTeoria[i].nombreProfesor;
          listaHoras[i] = this.gruposTeoria[i].numeroAlumnos;
          listaNombreGrupo[i] = this.gruposTeoria[i].nombreGrupo;
        }
        */
        ////////////////
        let existe = false;

        if (this.gruposPractica.length > 0) {
          listaProfesores[0] = this.gruposPractica[0].nombreProfesor;
          listaHoras[0] = this.gruposPractica[0].numeroAlumnos;
          listaNombreGrupo[0] = this.gruposPractica[0].nombreGrupo;

          for (let i = 1; i < this.gruposPractica.length; i++) {
            listaNombreGrupo.forEach((element) => {
              if (this.gruposPractica[i].nombreProfesor == element) {
                existe = true;
              }
            });

            if (!existe) {
              listaProfesores[i] = this.gruposPractica[i].nombreProfesor;
              listaHoras[i] = this.gruposPractica[i].numeroAlumnos;
              listaNombreGrupo[i] = this.gruposPractica[i].nombreGrupo;
            }

            existe = false;
          }
        }

        this.datosGrafico2.options.labels = listaProfesores;
        this.datosGrafico2.series = listaHoras;
        this.datosCargadosPractica = true;
      });
    },
  },
  created() {
    this.getGrupos(this.$route.params.codigo_asignatura);
  },
};
</script>
