<template>
  <div>
    <div class="field is-grouped">
      <div class="control">
        <label class="checkbox">
          <input type="checkbox" :value="0" v-model="profesoresSeleccionados" />
          {{ this.dataset[0].label }}
        </label>
      </div>
      <div class="control">
        <label class="checkbox">
          <input type="checkbox" :value="1" v-model="profesoresSeleccionados" />
          {{ this.dataset[1].label }}
        </label>
      </div>
    </div>

    <grafico-canvas
      :width="500"
      :height="300"
      :labels="['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes']"
      :tipo="this.tipoGrafico"
      :datasets="displayedDatasets"
      :options="$options.options"
    ></grafico-canvas>
  </div>
</template>

<script>
import numeral from "numeral";
import GraficoCanvas from "./GraficoCanvas";

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          callback: (value) => numeral(value).format("0"),
        },
      },
    ],
  },
  tooltips: {
    mode: "index",
    callbacks: {
      label(tooltipItem, data) {
        const label = data.datasets[tooltipItem.datasetIndex].label;
        const value = numeral(tooltipItem.yLabel).format("0");

        return `${label}: ${value}`;
      },
    },
  },
};

export default {
  name: "GruposAsignaturaGraficoScript",
  props: {
    dataset: Array,
    tipoGrafico: String,
  },
  options,
  components: {
    GraficoCanvas,
  },
  data() {
    return {
      profesoresSeleccionados: [0, 1], //CAMBIAR
    };
  },
  computed: {
    displayedDatasets() {
      return this.profesoresSeleccionados.map((id) => this.dataset[id]);
    },
  },
};
</script>
