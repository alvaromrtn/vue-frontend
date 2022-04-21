<template>
  <canvas ref="myChart" :width="width" :height="height"></canvas>
</template>

<script>
import Chart from "chart.js";

export default {
  name: "GraficoCanvasScript",
  props: {
    // Ancho Canvas:
    width: {
      type: Number,
      validator: (value) => value > 0,
    },
    // Alto Canvas:
    height: {
      type: Number,
      validator: (value) => value > 0,
    },
    // Etiquetas Gráfico:
    labels: Array,
    // Datos Gráfico:
    datasets: {
      type: Array,
      required: true,
    },
    // Opciones Gráfico:
    options: Object,
    // Tipo Gráfico:
    tipo: String, // -> bar | -> line | -> radar | -> polarArea
  },
  data() {
    return {
      chart: null,
    };
  },
  watch: {
    // Reemplaza los datos y llama a update() para volver a representar el gráfico:
    datasets(newDatasets) {
      this.chart.data.datasets = newDatasets;
      this.chart.update();
    },
  },
  mounted() {
    this.chart = new Chart(this.$refs.myChart, {
      type: this.tipo,
      data: {
        labels: this.labels,
        datasets: this.datasets,
      },
      options: this.options,
    });
  },
  // Destruye la instancia de Chart.js:
  beforeUnmount() {
    if (this.chart) {
      this.chart.destroy();
    }
  },
};
</script>
