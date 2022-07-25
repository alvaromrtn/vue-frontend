<template>
  <div class="container-busqueda">
    <div>
      <span>Buscar por: </span>
      <select v-model="campoBusqueda">
        <option value="nombreGrupo">GRUPO</option>
        <option value="nombreProfesor">PROFESOR</option>
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
          text: "C. GRUPO",
          value: "codigoGrupo",
          sortable: true,
          width: 5,
        },
        {
          text: "GRUPO",
          value: "nombreGrupo",
          sortable: true,
          width: 5,
        },
        {
          text: "C. AULA",
          value: "codigoAula",
          sortable: true,
          width: 5,
        },
        {
          text: "AULA",
          value: "nombreAula",
          sortable: true,
          width: 5,
        },
        {
          text: "C. PROFESOR",
          value: "codigoProfesor",
          sortable: true,
          width: 5,
        },
        {
          text: "PROFESOR",
          value: "nombreProfesor",
          sortable: true,
          width: 5,
        },
        {
          text: "CUATRIMESTRE",
          value: "periodo",
          sortable: true,
          width: 5,
        },
        {
          text: "DÍA",
          value: "horarioDiaSemana",
          sortable: true,
          width: 5,
        },
        {
          text: "H. INICIO",
          value: "horarioHoraInicio",
          sortable: true,
          width: 5,
        },
        {
          text: "H. SALIDA",
          value: "horarioHoraFin",
          sortable: true,
          width: 5,
        },
        {
          text: "EDIFICIO",
          value: "nombreEdificio",
          sortable: true,
          width: 5,
        },
        {
          text: "ALUMNOS",
          value: "numeroAlumnos",
          sortable: true,
          width: 5,
        },
      ],

      campoBusqueda: ref("nombreGrupo"),
      valorBusqueda: ref(""),

      elementosPorPagina: 10,
    };
  },
};
</script>
