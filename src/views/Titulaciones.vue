<template>
  <div class="container">
    <h1 class="text-center">Titulaciones</h1>

    <div v-if="datosCargados">
      <nav aria-label="PaginaciónTablaTitulaciones">
        <ul class="pagination justify-content-center">
          <li class="page-item" v-on:click="getPaginaAnterior()">
            <a class="page-link" href="#">Anterior</a>
          </li>
          <li
            v-for="pagina in numeroTotalPaginas()"
            :key="pagina"
            v-on:click="getTitulacionesPagina(pagina)"
            class="page-item"
            v-bind:class="paginaActiva(pagina)"
          >
            <a class="page-link" href="#">{{ pagina }}</a>
          </li>
          <li class="page-item" v-on:click="getPaginaSiguiente()">
            <a class="page-link" href="#">Siguiente</a>
          </li>
        </ul>
      </nav>
      <table class="table table-striped">
        <thead>
          <th style="width: 5%" v-on:click="ordenarPor('id')">ID</th>
          <th style="width: 40%" v-on:click="ordenarPor('centro')">CENTRO</th>
          <th style="width: 10%" v-on:click="ordenarPor('codigo')">CODIGO</th>
          <th style="width: 40%" v-on:click="ordenarPor('nombre')">NOMBRE</th>
          <th style="width: 5%" v-on:click="ordenarPor('numeroCursos')">
            CURSOS
          </th>
        </thead>
        <tbody>
          <tr
            v-for="titulacion in titulacionesPaginadas"
            v-bind:key="titulacion.id"
            v-on:click="navegarTitulacion(titulacion.codigo)"
          >
            <td style="width: 5%">{{ titulacion.id }}</td>
            <td style="width: 40%">{{ titulacion.centro }}</td>
            <td style="width: 10%">{{ titulacion.codigo }}</td>
            <td style="width: 40%">{{ titulacion.nombre }}</td>
            <td style="width: 5%">{{ titulacion.numeroCursos }}</td>
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
      titulacionesPaginadas: [],
      elementosPorPagina: 10,
      paginaActual: 1,
    };
  },
  methods: {
    getTitulaciones() {
      Titulaciones_Service.getTitulaciones().then((response) => {
        this.titulaciones = response.data;
        this.datosCargados = true;
        this.getTitulacionesPagina(1);
      });
    },
    navegarTitulacion(codigo) {
      var ruta = "/titulacion/" + codigo;
      window.location.href = ruta;
    },
    numeroTotalPaginas() {
      return Math.ceil(this.titulaciones.length / this.elementosPorPagina);
    },
    getTitulacionesPagina(numeroPagina) {
      this.paginaActual = numeroPagina;
      this.titulacionesPaginadas = [];
      let inicio =
        numeroPagina * this.elementosPorPagina - this.elementosPorPagina;
      let fin = numeroPagina * this.elementosPorPagina;
      this.titulacionesPaginadas = this.titulaciones.slice(inicio, fin);
    },
    getPaginaAnterior() {
      if (this.paginaActual > 1) {
        this.paginaActual--;
      }
      this.getTitulacionesPagina(this.paginaActual);
    },
    getPaginaSiguiente() {
      if (this.paginaActual < this.numeroTotalPaginas()) {
        this.paginaActual++;
      }
      this.getTitulacionesPagina(this.paginaActual);
    },
    paginaActiva(numeroPagina) {
      return numeroPagina == this.paginaActual ? "active" : "";
    },
    ordenarPor(campo) {
      switch (campo) {
        case "id":
          this.titulaciones.sort((a, b) => {
            if (a.id < b.id) {
              return -1;
            }
            if (a.id > b.id) {
              return 1;
            }
          });
          break;
        case "centro":
          this.titulaciones.sort((a, b) => {
            if (a.centro < b.centro) {
              return -1;
            }
            if (a.centro > b.centro) {
              return 1;
            }
          });
          break;
        case "codigo":
          this.titulaciones.sort((a, b) => {
            if (a.codigo < b.codigo) {
              return -1;
            }
            if (a.codigo > b.codigo) {
              return 1;
            }
          });
          break;
        case "nombre":
          this.titulaciones.sort((a, b) => {
            if (a.nombre < b.nombre) {
              return -1;
            }
            if (a.nombre > b.nombre) {
              return 1;
            }
          });
          break;
        case "numeroCursos":
          this.titulaciones.sort((a, b) => {
            if (a.numeroCursos < b.numeroCursos) {
              return -1;
            }
            if (a.numeroCursos > b.numeroCursos) {
              return 1;
            }
          });
          break;
      }
      this.getTitulacionesPagina(this.paginaActual);
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

.table > thead > th {
  cursor: pointer;
}
.table > tbody > tr {
  cursor: pointer;
}
</style>
