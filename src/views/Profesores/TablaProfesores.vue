<template>
  <div class="container-busqueda">
    <div>
      <span>Buscar por: </span>
      <select v-model="campoBusqueda">
        <option value="nombre">NOMBRE</option>
        <option value="apellidos">APELLIDOS</option>
        <option value="horas">HORAS</option>
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
    @click-row="navegarProfesor"
  ></EasyDataTable>
</template>

<script>
import { ref } from "vue";

export default {
  name: "TablaProfesoresScript",
  props: {
    datosTabla: Array,
  },
  data() {
    return {
      cabeceras: [
        {
          text: "NOMBRE",
          value: "nombre",
          sortable: true,
          width: 10,
        },
        {
          text: "APELLIDOS",
          value: "apellidos",
          sortable: true,
          width: 10,
        },
        {
          text: "HORAS",
          value: "horas",
          sortable: true,
          width: 5,
        },
      ],

      campoBusqueda: ref("apellidos"),
      valorBusqueda: ref(""),

      elementosPorPagina: 10,

      navegarProfesor: (item) => {
        var ruta = "/profesor/" + item.id + "/asignaturas";
        this.$router.push(ruta);
      },
    };
  },
};
</script>
