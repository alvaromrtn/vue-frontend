<template>
  <div class="field is-grouped">
    <div v-for="index in arrayNumeroProfesores" :key="index">
      <div class="control">
        <label class="checkbox">
          <input
            type="checkbox"
            :value="this.arrayNumeroProfesores[index]"
            v-model="profesoresSeleccionados"
          />
          {{ this.dataset[index].label }}
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
    arrayNumeroProfesores: Array,
  },
  options,
  components: {
    GraficoCanvas,
  },
  data() {
    return {
      profesoresSeleccionados: this.arrayNumeroProfesores, //CAMBIAR
    };
  },
  computed: {
    displayedDatasets() {
      return this.profesoresSeleccionados.map((id) => this.dataset[id]);
    },
  },
};
</script>
