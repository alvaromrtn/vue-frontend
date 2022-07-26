<template>
  <main id="asignaturas" style="width: 1000px">
    <h1>ASIGNATURAS</h1>
    <br />
    <div class="container">
      <div v-if="datosCargados">
        <TablaAsignaturas :datosTabla="this.asignaturas"></TablaAsignaturas>
        <br />
        <br />
        <h2>GRÁFICO SEGÚN EL NÚMERO DE ASIGNATURAS POR TITULACIÓN</h2>
        <GraficoAsignaturas :datos="this.datosGrafico"></GraficoAsignaturas>
        <br />
      </div>
      <div v-else>
        <ProcesoCarga />
      </div>
    </div>
  </main>
</template>

<script>
import Asignaturas_Service from "../../services/Asignaturas_Service.js";
import TablaAsignaturas from "./TablaAsignaturas.vue";
import GraficoAsignaturas from "./GraficoAsignaturas.vue";
import DatasetGraficoBar from "../../components/DatasetGraficoBar_Component.js";
import ProcesoCarga from "../ProcesoCarga.vue";

export default {
  name: "AsignaturasScript",
  watch: {
    title: {
      immediate: true,
      handler() {
        document.title = "Asignaturas";
      },
    },
  },
  data() {
    return {
      asignaturas: [],
      datosGrafico: {},
      datosCargados: false,
    };
  },
  components: {
    TablaAsignaturas,
    GraficoAsignaturas,
    ProcesoCarga,
  },
  methods: {
    getAsignaturas() {
      Asignaturas_Service.getAsignaturas().then((response) => {
        this.asignaturas = response.data;

        this.asignaturas.sort((a, b) => {
          if (a.nombreTitulacion < b.nombreTitulacion) return -1;

          if (a.nombreTitulacion > b.nombreTitulacion) return 1;
        });

        this.datosGrafico = DatasetGraficoBar.getDataset();

        // Se crea una lista de objetos con nombreTitulacion y cantidad=1:
        let listaObjetos = [];
        for (let i = 0; i < this.asignaturas.length; i++) {
          let objeto = new Object();
          objeto.nombreTitulacion = this.asignaturas[i].nombreTitulacion;
          objeto.cantidad = 1;
          listaObjetos.push(objeto);
        }

        // Se eliminan los objetos con mismo nombreTitulacion y se suman las cantidades:
        const listaSinDuplicados = listaObjetos.reduce(
          (acumulador, valorActual) => {
            const elementoYaExiste = acumulador.find(
              (elemento) =>
                elemento.nombreTitulacion === valorActual.nombreTitulacion
            );
            if (elementoYaExiste) {
              return acumulador.map((elemento) => {
                if (
                  elemento.nombreTitulacion === valorActual.nombreTitulacion
                ) {
                  return {
                    ...elemento,
                    cantidad: elemento.cantidad + valorActual.cantidad,
                  };
                }
                return elemento;
              });
            }

            return [...acumulador, valorActual];
          },
          []
        );

        // Se ordena la lista de objetos por cantidades:
        listaSinDuplicados.sort((a, b) => {
          if (a.cantidad < b.cantidad) return 1;

          if (a.cantidad > b.cantidad) return -1;
        });

        // Se almacenan los nombreTitulacion y cantidad en listas para cargar los datos del gráfico:
        let listaTitulaciones = [];
        let listaNumeroAsignaturas = [];
        for (let i = 0; i < listaSinDuplicados.length; i++) {
          listaTitulaciones[i] = listaSinDuplicados[i].nombreTitulacion;
          listaNumeroAsignaturas[i] = listaSinDuplicados[i].cantidad;
        }

        this.datosGrafico.options.xaxis.categories = listaTitulaciones;
        this.datosGrafico.series[0].data = listaNumeroAsignaturas;
        this.datosGrafico.series[0].name = "Número de asignaturas";

        this.datosCargados = true;
      });
    },
  },
  created() {
    this.getAsignaturas();
  },
};
</script>
