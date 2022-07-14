<template>
  <div>
    <apexchart
      height="1500"
      type="bar"
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
