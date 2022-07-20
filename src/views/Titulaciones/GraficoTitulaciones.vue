<template>
  <div>
    <apexchart
      height="500"
      type="bar"
      :options="this.datos.options"
      :series="this.datos.series"
    ></apexchart>
  </div>
</template>

<script>
export default {
  name: "GraficoTitulacionesScript",
  props: {
    datos: Object,
  },
};
</script>
