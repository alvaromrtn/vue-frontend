<template>
  <div class="container">
    <h1 class="text-center">
      <p>
        {{ $t("asignaturas.titulacion") }}:
        {{ $route.params.codigo_titulacion }}
      </p>
      <p>
        {{ $t("asignaturas.asignaturas") }}
      </p>
    </h1>
    <div v-if="datosCargados">
      <table class="table table-striped table-responsive">
        <thead>
          <th>{{ $t("asignaturas.tabla.caracter") }}</th>
          <th>{{ $t("asignaturas.tabla.codigo") }}</th>
          <th>{{ $t("asignaturas.tabla.creditos_p") }}</th>
          <th>{{ $t("asignaturas.tabla.creditos_t") }}</th>
          <th>{{ $t("asignaturas.tabla.curso") }}</th>
          <th>{{ $t("asignaturas.tabla.nombre") }}</th>
          <th>{{ $t("asignaturas.tabla.cuatrimestre") }}</th>
          <th>{{ $t("asignaturas.tabla.responsable") }}</th>
          <th>{{ $t("asignaturas.tabla.titulacion") }}</th>
        </thead>
        <tbody>
          <tr
            v-for="asignatura in asignaturas"
            v-bind:key="asignatura.codigoAsignatura"
            v-on:click="
              navegarAsignatura(
                $route.params.codigo_titulacion,
                asignatura.codigoAsignatura
              )
            "
          >
            <td>{{ asignatura.caracterAsignatura }}</td>
            <td>{{ asignatura.codigoAsignatura }}</td>
            <td>{{ asignatura.creditosPractica }}</td>
            <td>{{ asignatura.creditosTeoria }}</td>
            <td>{{ asignatura.cursoAsignatura }}</td>
            <td>{{ asignatura.nombreAsignatura }}</td>
            <td>{{ asignatura.periodoAsignatura }}</td>
            <td>{{ asignatura.responsableAsignatura }}</td>
            <td>{{ asignatura.titulacionAsignatura }}</td>
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
import Asignaturas_Service from "../services/Asignaturas_Service";
import ProcesoCarga from "./ProcesoCarga";

export default {
  name: "AsignaturasTitulacionScript",
  data() {
    return {
      asignaturas: [],
      datosCargados: false,
    };
  },
  components: {
    ProcesoCarga,
  },
  methods: {
    getAsignaturas(codigo_titulacion) {
      Asignaturas_Service.getAsignaturas(codigo_titulacion).then((response) => {
        this.asignaturas = response.data;
        this.datosCargados = true;
      });
    },
    navegarAsignatura(codigo_titulacion, codigo_asignatura) {
      var ruta =
        "/titulacion/" + codigo_titulacion + "/asignatura/" + codigo_asignatura;
      this.$router.push(ruta);
    },
  },
  created() {
    this.getAsignaturas(this.$route.params.codigo_titulacion);
  },
};
</script>
