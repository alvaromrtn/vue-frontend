<template>
  <main id="gruposAsignatura" style="width: 1000px">
    <div v-if="datosCargadosTeoria">
      <div v-if="gruposTeoria.length != 0">
        <h1>
          {{ this.gruposTeoria[0].nombreAsignatura }}
        </h1>

        <br />

        <TablaGruposAsignatura
          :datosTabla="this.gruposTeoria"
        ></TablaGruposAsignatura>

        <br />

        <h2>GRÁFICOS SEGÚN EL NÚMERO DE ALUMNOS POR GRUPO</h2>
        <br />

        <div class="container-graficos">
          <div>
            <div v-if="datosGraficoTeoria.series.length != 0">
              <h4>TEORÍA:</h4>
              <GraficoGruposAsignatura
                :datos="this.datosGraficoTeoria"
              ></GraficoGruposAsignatura>
            </div>
          </div>
          <div>
            <div v-if="datosGraficoPractica.series.length != 0">
              <h4>PRÁCTICA:</h4>
              <GraficoGruposAsignatura
                :datos="this.datosGraficoPractica"
              ></GraficoGruposAsignatura>
            </div>
          </div>
        </div>

        <br />

        <h2>GRUPOS DE PRÁCTICA</h2>
        <br />
        <TablaGruposAsignatura
          :datosTabla="this.gruposPractica"
        ></TablaGruposAsignatura>
      </div>
      <div v-else>
        <NoExisteInformacion />
      </div>
    </div>

    <div v-else>
      <ProcesoCarga />
    </div>
  </main>
</template>

<script>
import Grupos_Service from "../../services/Grupos_Service.js";
import TablaGruposAsignatura from "./TablaGruposAsignatura.vue";
import GraficoGruposAsignatura from "./GraficoGruposAsignatura.vue";
import DatasetGraficoDonut from "../../components/DatasetGraficoDonut_Component.js";
import ProcesoCarga from "../ProcesoCarga.vue";
import NoExisteInformacion from "../NoExisteInformacion.vue";

export default {
  name: "GruposAsignaturaScript",
  components: {
    TablaGruposAsignatura,
    GraficoGruposAsignatura,
    ProcesoCarga,
    NoExisteInformacion,
  },
  data() {
    return {
      gruposTeoria: [],
      gruposPractica: [],
      datosGraficoTeoria: {},
      datosGraficoPractica: {},
      datosCargadosTeoria: false,
      datosCargadosPractica: false,
    };
  },
  methods: {
    getGrupos(codigo_asignatura) {
      Grupos_Service.getGruposTeoria(codigo_asignatura).then((response) => {
        this.gruposTeoria = response.data;

        this.gruposTeoria.sort((a, b) => {
          if (a.nombreGrupo < b.nombreGrupo) return -1;

          if (a.nombreGrupo > b.nombreGrupo) return 1;
        });

        this.datosGraficoTeoria = DatasetGraficoDonut.getDataset();

        // Se crea una lista de objetos con nombreGrupo y numeroAlumnos:
        let listaObjetos = [];
        for (let i = 0; i < this.gruposTeoria.length; i++) {
          let objeto = new Object();
          objeto.nombreGrupo = this.gruposTeoria[i].nombreGrupo;
          objeto.numeroAlumnos = this.gruposTeoria[i].numeroAlumnos;
          listaObjetos.push(objeto);
        }

        // Se filtra la lista de objetos y se elimina el objeto con nombreGrupo repetido:
        let hash = {};
        listaObjetos = listaObjetos.filter((o) =>
          hash[o.nombreGrupo] ? false : (hash[o.nombreGrupo] = true)
        );

        // Se almacenan los nombreGrupo y numeroAlumnos en listas para cargar los datos del gráfico:
        let listaNombreGrupo = [];
        let listaNumeroAlumnos = [];
        for (let i = 0; i < listaObjetos.length; i++) {
          listaNumeroAlumnos[i] = listaObjetos[i].numeroAlumnos;
          listaNombreGrupo[i] = listaObjetos[i].nombreGrupo;
        }

        this.datosGraficoTeoria.options.labels = listaNombreGrupo;
        this.datosGraficoTeoria.series = listaNumeroAlumnos;

        this.datosCargadosTeoria = true;
      });
      Grupos_Service.getGruposPractica(codigo_asignatura).then((response) => {
        this.gruposPractica = response.data;

        this.gruposPractica.sort((a, b) => {
          if (a.nombreGrupo < b.nombreGrupo) return -1;

          if (a.nombreGrupo > b.nombreGrupo) return 1;
        });

        this.datosGraficoPractica = DatasetGraficoDonut.getDataset();

        // Se crea una lista de objetos con nombreGrupo y numeroAlumnos:
        let listaObjetos = [];
        for (let i = 0; i < this.gruposPractica.length; i++) {
          let objeto = new Object();
          objeto.nombreGrupo = this.gruposPractica[i].nombreGrupo;
          objeto.numeroAlumnos = this.gruposPractica[i].numeroAlumnos;
          listaObjetos.push(objeto);
        }

        // Se filtra la lista de objetos y se elimina el objeto con nombreGrupo repetido:
        let hash = {};
        listaObjetos = listaObjetos.filter((o) =>
          hash[o.nombreGrupo] ? false : (hash[o.nombreGrupo] = true)
        );

        // Se almacenan los nombreGrupo y numeroAlumnos en listas para cargar los datos del gráfico:
        let listaNombreGrupo = [];
        let listaNumeroAlumnos = [];
        for (let i = 0; i < listaObjetos.length; i++) {
          listaNumeroAlumnos[i] = listaObjetos[i].numeroAlumnos;
          listaNombreGrupo[i] = listaObjetos[i].nombreGrupo;
        }

        this.datosGraficoPractica.options.labels = listaNombreGrupo;
        this.datosGraficoPractica.series = listaNumeroAlumnos;

        this.datosCargadosPractica = true;
      });
    },
  },
  created() {
    this.getGrupos(this.$route.params.codigo_asignatura);
  },
};
</script>

<style>
.container-graficos {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-columns: 1fr;
  grid-auto-rows: 1fr;
  gap: 20px 0px;
  grid-auto-flow: row;
}
</style>
