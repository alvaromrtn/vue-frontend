<template>
  <main id="titulaciones" style="width: 1000px">
    <h1>TITULACIONES</h1>
    <br />
    <div class="container">
      <div v-if="datosCargados">
        <TablaTitulaciones :datosTabla="this.titulaciones"></TablaTitulaciones>
        <br />
        <br />
        <h2>GRÁFICO SEGÚN EL NÚMERO DE TITULACIONES POR CENTRO</h2>
        <GraficoTitulaciones :datos="this.datosGrafico"></GraficoTitulaciones>
        <br />
      </div>
      <div v-else>
        <ProcesoCarga />
      </div>
    </div>
  </main>
</template>

<script>
import Titulaciones_Service from "../../services/Titulaciones_Service.js";
import TablaTitulaciones from "./TablaTitulaciones.vue";
import GraficoTitulaciones from "./GraficoTitulaciones.vue";
import DatasetGraficoBar from "../../components/DatasetGraficoBar_Component.js";
import ProcesoCarga from "../ProcesoCarga.vue";

export default {
  name: "TitulacionesScript",
  data() {
    return {
      titulaciones: [],
      datosGrafico: {},
      datosCargados: false,
    };
  },
  components: {
    TablaTitulaciones,
    GraficoTitulaciones,
    ProcesoCarga,
  },
  methods: {
    getTitulaciones() {
      Titulaciones_Service.getTitulaciones().then((response) => {
        this.titulaciones = response.data;

        this.titulaciones.sort((a, b) => {
          if (a.centro < b.centro) return -1;

          if (a.centro > b.centro) return 1;
        });

        this.datosGrafico = DatasetGraficoBar.getDataset();

        // Se crea una lista de objetos con centro y cantidad=1:
        let listaObjetos = [];
        for (let i = 0; i < this.titulaciones.length; i++) {
          let objeto = new Object();
          objeto.centro = this.titulaciones[i].centro;
          objeto.cantidad = 1;
          listaObjetos.push(objeto);
        }

        // Se eliminan los objetos con mismo centro y se suman las cantidades:
        const listaSinDuplicados = listaObjetos.reduce(
          (acumulador, valorActual) => {
            const elementoYaExiste = acumulador.find(
              (elemento) => elemento.centro === valorActual.centro
            );
            if (elementoYaExiste) {
              return acumulador.map((elemento) => {
                if (elemento.centro === valorActual.centro) {
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
        let listaCentros = [];
        let listaNumeroTitulaciones = [];
        for (let i = 0; i < listaSinDuplicados.length; i++) {
          listaCentros[i] = listaSinDuplicados[i].centro;
          listaNumeroTitulaciones[i] = listaSinDuplicados[i].cantidad;
        }

        this.datosGrafico.options.xaxis.categories = listaCentros;
        this.datosGrafico.series[0].data = listaNumeroTitulaciones;
        this.datosGrafico.series[0].name = "Número de titulaciones";

        this.datosCargados = true;
      });
    },
  },
  created() {
    this.getTitulaciones();
  },
};
</script>
