<template>
  <div>
    <apexchart
      height="500"
      type="donut"
      :options="this.datos.options"
      :series="this.datos.series"
    ></apexchart>
  </div>
</template>

<script>
export default {
  name: "ProfesoresGraficoScript",
  props: {
    datos: Object,
  },
};
</script>
