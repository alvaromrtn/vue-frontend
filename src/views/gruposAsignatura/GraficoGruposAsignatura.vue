<template>
  <div>
    <apexchart
      height="250"
      type="donut"
      :options="this.datos.options"
      :series="this.datos.series"
    ></apexchart>
  </div>
</template>

<script>
export default {
  name: "GraficoGruposScript",
  props: {
    datos: Object,
  },
};
</script>
