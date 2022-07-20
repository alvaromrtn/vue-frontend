<template>
  <div>
    <apexchart
      height="1000"
      type="bar"
      :options="this.datos.options"
      :series="this.datos.series"
    ></apexchart>
  </div>
</template>

<script>
export default {
  name: "GraficoAsignaturasScript",
  props: {
    datos: Object,
  },
};
</script>
