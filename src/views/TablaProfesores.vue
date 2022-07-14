<template>
  <div class="container-busqueda">
    <div>
      <span>Buscar por:</span>
      <select v-model="searchField">
        <option>nombre</option>
        <option>horas</option>
      </select>
    </div>
    <div>
      <span>search value: </span> <input type="text" v-model="searchValue" />
    </div>
  </div>

  <EasyDataTable
    ref="tabla"
    :headers="cabeceras"
    :items="profesores"
    alternating
    buttons-pagination
    :search-field="searchField"
    :search-value="searchValue"
    @click-row="showRow"
    :rows-per-page="elementosPorPagina"
    hide-rows-per-page
  ></EasyDataTable>
</template>

<script>
import { ref } from "vue";

export default {
  name: "TablaScript",
  props: {
    profesores: Array,
  },
  data() {
    return {
      cabeceras: [
        { text: "ID", value: "id", sortable: true, width: 1 },
        {
          text: "NOMBRE",
          value: "nombre",
          sortable: true,
          width: 5,
        },
        {
          text: "APELLIDOS",
          value: "apellidos",
          sortable: true,
          width: 5,
        },
        {
          text: "HORAS",
          value: "horas",
          sortable: true,
          width: 5,
        },
      ],

      searchField: ref(""),
      searchValue: ref(""),

      showRow: (item) => {
        this.navegarProfesor(item.id);
      },

      elementosPorPagina: 10,

      // $ref tabla
      tabla: ref(),

      nextPage: () => {
        //dataTable.value.nextPage();
        console.log("aaaaa");
        console.log();
      },
    };
  },
  methods: {
    navegarProfesor(columna_profesor) {
      var ruta = "/profesor/" + columna_profesor;
      this.$router.push(ruta);
    },
  },
  created() {},
};
</script>

<style>
.container-busqueda {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-columns: 1fr;
  grid-auto-rows: 1fr;
  gap: 20px 0px;
  grid-auto-flow: row;
  justify-items: center;
}
</style>
