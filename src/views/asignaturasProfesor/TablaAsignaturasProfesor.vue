<template>
  <div class="container-busqueda">
    <div>
      <span>Buscar por: </span>
      <select v-model="campoBusqueda">
        <option value="codigoAsignatura">CÓDIGO</option>
        <option value="nombreAsignatura">NOMBRE</option>
        <option value="cursoAsignatura">CURSO</option>
        <option value="nombreTitulacion">TITULACIÓN</option>
      </select>
    </div>
    <div>
      <span>Valor de búsqueda: </span>
      <input type="text" v-model="valorBusqueda" />
    </div>
  </div>

  <br />

  <EasyDataTable
    :headers="cabeceras"
    :items="datosTabla"
    alternating
    buttons-pagination
    hide-rows-per-page
    :search-field="campoBusqueda"
    :search-value="valorBusqueda"
    :rows-per-page="elementosPorPagina"
    @click-row="navegarAsignatura"
  ></EasyDataTable>
</template>

<script>
import { ref } from "vue";

export default {
  name: "TablaAsignaturasProfesorScript",
  props: {
    datosTabla: Array,
  },
  data() {
    return {
      cabeceras: [
        {
          text: "CÓDIGO",
          value: "codigoAsignatura",
          sortable: true,
          width: 10,
        },
        {
          text: "NOMBRE",
          value: "nombreAsignatura",
          sortable: true,
          width: 10,
        },
        {
          text: "CURSO",
          value: "cursoAsignatura",
          sortable: true,
          width: 5,
        },
        {
          text: "CUATRIMESTRE",
          value: "periodoAsignatura",
          sortable: true,
          width: 5,
        },
        {
          text: "CARÁCTER",
          value: "caracterAsignatura",
          sortable: true,
          width: 5,
        },
        {
          text: "CRÉDITOS TEORÍA",
          value: "creditosTeoria",
          sortable: true,
          width: 5,
        },
        {
          text: "CRÉDITOS PRÁCTICA",
          value: "creditosPractica",
          sortable: true,
          width: 5,
        },
        {
          text: "TITULACIÓN",
          value: "nombreTitulacion",
          sortable: true,
          width: 5,
        },
        {
          text: "HORAS",
          value: "horasTotales",
          sortable: true,
          width: 5,
        },
      ],

      campoBusqueda: ref("nombreAsignatura"),
      valorBusqueda: ref(""),

      elementosPorPagina: 10,

      navegarAsignatura: (item) => {
        var ruta = "/asignatura/" + item.id + "/profesores";
        this.$router.push(ruta);
      },
    };
  },
};
</script>
