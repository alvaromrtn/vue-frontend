<template>
  <div class="container">
    <h1 class="text-center">Titulaciones</h1>

    <div class="grid">
      <div id="filtro">
        <form action class="form" @submit.prevent="filtroNombre()">
          <label class="form-label">Nombre: </label>
          <input
            class="form-input"
            v-model="filtro"
            type="text"
            placeholder="Grado en Biología"
          />
          <input class="form-submit" type="submit" value="Filtrar" />
        </form>

        <input
          type="button"
          value="Borrar filtros"
          v-on:click="borrarFiltro()"
        />
      </div>
      <div id="paginación">
        <nav aria-label="PaginaciónTablaTitulaciones">
          <ul class="pagination justify-content-center">
            <li class="page-item" v-on:click="getPaginaAnterior()">
              <a class="page-link">Anterior</a>
            </li>
            <li
              v-for="pagina in numeroTotalPaginas()"
              :key="pagina"
              v-on:click="getTitulacionesPagina(pagina)"
              class="page-item"
              v-bind:class="paginaActiva(pagina)"
            >
              <a class="page-link">{{ pagina }}</a>
            </li>
            <li class="page-item" v-on:click="getPaginaSiguiente()">
              <a class="page-link">Siguiente</a>
            </li>
          </ul>
        </nav>
      </div>
      <div id="ordenación">
        <div class="dropdown" style="float: right">
          <button class="dropbtn">Ordenar</button>
          <div class="dropdown-content">
            <a v-on:click="ordenarPor('centro_descendente')">CENTRO ▾</a>
            <a v-on:click="ordenarPor('centro_ascendente')">CENTRO ▴</a>
            <a v-on:click="ordenarPor('codigo_descendente')">CODIGO ▾</a>
            <a v-on:click="ordenarPor('codigo_ascendente')">CODIGO ▴</a>
            <a v-on:click="ordenarPor('nombre_descendente')">NOMBRE ▾</a>
            <a v-on:click="ordenarPor('nombre_ascendente')">NOMBRE ▴</a>
            <a v-on:click="ordenarPor('numeroCursos_descendente')">CURSOS ▾</a>
            <a v-on:click="ordenarPor('numeroCursos_ascendente')">CURSOS ▴</a>
          </div>
        </div>
      </div>
    </div>

    <div v-if="datosCargados">
      <table class="table table-striped table-responsive">
        <thead>
          <th style="width: 40%">CENTRO</th>
          <th style="width: 15%">CODIGO</th>
          <th style="width: 40%">NOMBRE</th>
          <th style="width: 5%">CURSOS</th>
        </thead>
        <tbody>
          <tr
            v-for="titulacion in titulacionesPaginadas"
            v-bind:key="titulacion.nombre"
            v-on:click="navegarTitulacion(titulacion.codigo)"
          >
            <td style="width: 40%">{{ titulacion.centro }}</td>
            <td style="width: 15">{{ titulacion.codigo }}</td>
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
      titulacionesCopia: [],
      datosCargados: false,
      //
      titulacionesPaginadas: [],
      elementosPorPagina: 10,
      paginaActual: 1,
      //
      filtro: "",
    };
  },
  methods: {
    filtroNombre() {
      let titulacionesFiltradas = [];
      this.titulaciones.forEach((titulacion) => {
        if (
          titulacion.nombre.toLowerCase().includes(this.filtro.toLowerCase())
        ) {
          titulacionesFiltradas.push(titulacion);
        }
      });
      this.titulaciones = titulacionesFiltradas;
      this.getTitulacionesPagina(1);
    },
    borrarFiltro() {
      this.titulaciones = this.titulacionesCopia;
    },
    getTitulaciones() {
      Titulaciones_Service.getTitulaciones().then((response) => {
        this.titulaciones = response.data;
        this.datosCargados = true;
        this.titulacionesCopia = this.titulaciones;
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
        case "centro_descendente":
          this.titulaciones.sort((a, b) => {
            if (a.centro < b.centro) {
              return -1;
            }
            if (a.centro > b.centro) {
              return 1;
            }
          });
          break;
        case "codigo_descendente":
          this.titulaciones.sort((a, b) => {
            if (a.codigo < b.codigo) {
              return -1;
            }
            if (a.codigo > b.codigo) {
              return 1;
            }
          });
          break;
        case "nombre_descendente":
          this.titulaciones.sort((a, b) => {
            if (a.nombre < b.nombre) {
              return -1;
            }
            if (a.nombre > b.nombre) {
              return 1;
            }
          });
          break;
        case "numeroCursos_descendente":
          this.titulaciones.sort((a, b) => {
            if (a.numeroCursos < b.numeroCursos) {
              return -1;
            }
            if (a.numeroCursos > b.numeroCursos) {
              return 1;
            }
          });
          break;
        case "centro_ascendente":
          this.titulaciones.sort((a, b) => {
            if (a.centro < b.centro) {
              return 1;
            }
            if (a.centro > b.centro) {
              return -1;
            }
          });
          break;
        case "codigo_ascendente":
          this.titulaciones.sort((a, b) => {
            if (a.codigo < b.codigo) {
              return 1;
            }
            if (a.codigo > b.codigo) {
              return -1;
            }
          });
          break;
        case "nombre_ascendente":
          this.titulaciones.sort((a, b) => {
            if (a.nombre < b.nombre) {
              return 1;
            }
            if (a.nombre > b.nombre) {
              return -1;
            }
          });
          break;
        case "numeroCursos_ascendente":
          this.titulaciones.sort((a, b) => {
            if (a.numeroCursos < b.numeroCursos) {
              return 1;
            }
            if (a.numeroCursos > b.numeroCursos) {
              return -1;
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
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

.pagination {
  cursor: pointer;
  padding: 10px;
}
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
  cursor: default;
}
.table > tbody > tr {
  cursor: pointer;
}

.dropbtn {
  background-color: white;
  color: black;
  padding: 5px;
  cursor: pointer;
  border: solid 1px black;
  border-radius: 5px;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  right: 0;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
}

.dropdown:hover .dropdown-content {
  display: block;
}
</style>
