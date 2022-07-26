<template>
  <div class="container-busqueda">
    <div>
      <span>Buscar por: </span>
      <select v-model="campoBusqueda">
        <option value="codigo">CÓDIGO</option>
        <option value="nombre">NOMBRE</option>
        <option value="centro">CENTRO</option>
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
    @click-row="navegarTitulacion"
  ></EasyDataTable>
</template>

<script>
import { ref } from "vue";

export default {
  name: "TablaTitulacionesScript",
  props: {
    datosTabla: Array,
  },
  data() {
    return {
      cabeceras: [
        {
          text: "CÓDIGO",
          value: "codigo",
          sortable: true,
          width: 10,
        },
        {
          text: "NOMBRE",
          value: "nombre",
          sortable: true,
          width: 10,
        },
        {
          text: "CURSOS",
          value: "numeroCursos",
          sortable: true,
          width: 5,
        },
        {
          text: "CENTRO",
          value: "centro",
          sortable: true,
          width: 5,
        },
      ],

      campoBusqueda: ref("nombre"),
      valorBusqueda: ref(""),

      elementosPorPagina: 10,

      navegarTitulacion: (item) => {
        var ruta = "/titulacion/" + item.codigo + "/asignaturas";
        this.$router.push(ruta);
      },
    };
  },
};
</script>
