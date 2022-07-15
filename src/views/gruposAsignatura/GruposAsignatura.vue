<template>
  <main id="gruposAsignatura">
    <h1 class="text-center">
      <p>CÓDIGO ASIGNATURAS: {{ $route.params.codigo_asignatura }}</p>
      <p>GRUPOS</p>
    </h1>
    <br />

    <div class="container">
      <div v-if="datosCargadosTeoria">
        <TablaGruposAsignatura
          :datosTabla="this.gruposTeoria"
        ></TablaGruposAsignatura>
        <br />
        <GraficoGruposAsignatura
          :datos="this.datosGrafico"
        ></GraficoGruposAsignatura>
        <br />
        <TablaGruposAsignatura
          :datosTabla="this.gruposPractica"
        ></TablaGruposAsignatura>
        <br />
        <GraficoGruposAsignatura
          :datos="this.datosGrafico2"
        ></GraficoGruposAsignatura>
      </div>
      <div v-else>
        <ProcesoCarga />
      </div>
    </div>
  </main>
</template>

<script>
import Grupos_Service from "../../services/Grupos_Service.js";
import TablaGruposAsignatura from "./TablaGruposAsignatura.vue";
import GraficoGruposAsignatura from "./GraficoGruposAsignatura.vue";
import ProcesoCarga from "../ProcesoCarga.vue";

export default {
  name: "GruposAsignaturaScript",
  components: {
    TablaGruposAsignatura,
    GraficoGruposAsignatura,
    ProcesoCarga,
  },
  data() {
    return {
      gruposTeoria: [],
      gruposPractica: [],

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

      datosCargadosTeoria: false,
      datosCargadosPractica: false,
    };
  },
  methods: {
    getGrupos(codigo_asignatura) {
      Grupos_Service.getGruposTeoria(codigo_asignatura).then((response) => {
        this.gruposTeoria = response.data;

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

        ////////////////////

        this.datosCargadosTeoria = true;
      });
      Grupos_Service.getGruposPractica(codigo_asignatura).then((response) => {
        this.gruposPractica = response.data;

        /////////////

        let listaProfesores = [];
        let listaHoras = [];
        let listaNombreGrupo = [];

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
