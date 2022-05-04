<template>
  <div class="container">
    <h1 class="text-center">Lista de Titulaciones</h1>

    <h1 class="text-center">TOTAL DE PAGINAS: {{ totalPaginas() }}</h1>

    <div v-if="datosCargados">
      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
          <li class="page-item" v-on:click="getPreviousPage()">
            <a class="page-link" href="#">Previous</a>
          </li>
          <li
            v-for="pagina in totalPaginas()"
            :key="pagina"
            v-on:click="getDataPagina(pagina)"
            class="page-item"
            v-bind:class="isActive(pagina)"
          >
            <a class="page-link" href="#">{{ pagina }}</a>
          </li>
          <li class="page-item" v-on:click="getNextPage()">
            <a class="page-link" href="#">Next</a>
          </li>
        </ul>
      </nav>
      <table class="table table-striped">
        <thead>
          <th>ID</th>
          <th>CENTRO</th>
          <th>CODIGO</th>
          <th>NOMBRE</th>
          <th>CURSOS</th>
        </thead>
        <tbody>
          <tr
            v-for="titulacion in titulacionesPaginadas"
            v-bind:key="titulacion.id"
            v-on:click="navegarTitulacion(titulacion.codigo)"
          >
            <td>{{ titulacion.id }}</td>
            <td>{{ titulacion.centro }}</td>
            <td>{{ titulacion.codigo }}</td>
            <td>{{ titulacion.nombre }}</td>
            <td>{{ titulacion.numeroCursos }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <ProcesoCarga />
    </div>
  </div>
</template>

<script>
import Titulaciones_Service from "../services/Titulaciones_Service";
import ProcesoCarga from "./ProcesoCarga";

export default {
  name: "TitulacionesScript",
  components: {
    ProcesoCarga,
  },
  data() {
    return {
      titulaciones: [],
      datosCargados: false,
      //
      elementosPorPagina: 10,
      titulacionesPaginadas: [],
      paginaActual: 1,
    };
  },
  methods: {
    getTitulaciones() {
      Titulaciones_Service.getTitulaciones().then((response) => {
        this.titulaciones = response.data;
        this.datosCargados = true;
        this.getDataPagina(1);
      });
    },
    navegarTitulacion(codigo) {
      var ruta = "/titulacion/" + codigo;
      window.location.href = ruta;
    },
    totalPaginas() {
      return Math.ceil(this.titulaciones.length / this.elementosPorPagina);
    },
    getDataPagina(numeroPagina) {
      this.paginaActual = numeroPagina;
      this.titulacionesPaginadas = [];
      let ini =
        numeroPagina * this.elementosPorPagina - this.elementosPorPagina;
      let fin = numeroPagina * this.elementosPorPagina;
      /*
      for (let index = ini; index < fin; index++) {
        this.titulacionesPaginadas.push(this.titulaciones[index]);
      }
      */
      this.titulacionesPaginadas = this.titulaciones.slice(ini, fin);
    },
    getPreviousPage() {
      if (this.paginaActual > 1) {
        this.paginaActual--;
      }
      this.getDataPagina(this.paginaActual);
    },
    getNextPage() {
      if (this.paginaActual < this.totalPaginas()) {
        this.paginaActual++;
      }

      this.getDataPagina(this.paginaActual);
    },
    isActive(numeroPagina) {
      //active
      /*
      if (numeroPagina == this.paginaActual) {
        return "active";
      } else {
        return "";
      }*/
      return numeroPagina == this.paginaActual ? "active" : "";
    },
  },
  created() {
    this.getTitulaciones();
  },
};
</script>

<style>
.pagination > li > a {
  background-color: white;
  color: black;
}

.pagination > .active > a {
  color: white;
  background-color: red !important;
  border: solid 1px red !important;
}

.pagination > .active > a:hover {
  background-color: red !important;
  border: solid 1px red;
}
</style>
