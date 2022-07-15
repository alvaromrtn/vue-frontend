<template>
  <!-- navbar -->
  <div id="nav">
    <nav class="container-fluid navbar navbar-expand-lg navbar-light bg-light">
      <a
        title="Universidad de Salamanca"
        href="https://www.usal.es"
        target="_blank"
      >
        <img
          src="../../static/images/logo_usal.png"
          alt="Universidad de Salamanca"
          height="100"
        />
      </a>

      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <div class="navbar-nav mr-auto">
          <router-link to="/" class="nav-link">Home</router-link>
          <router-link to="/titulaciones" class="nav-link"
            >TitulacionesDIAWEB</router-link
          >
          <router-link to="/profesores" class="nav-link"
            >ProfesoresEXCEL</router-link
          >

          <router-link to="/asignaturas" class="nav-link"
            >AsignaturasEXCEL</router-link
          >
          <router-link to="/contacto" class="nav-link">Contacto</router-link>
        </div>
      </div>

      <LocaleSwitcher />
    </nav>
  </div>
</template>

<script>
import LocaleSwitcher from "./LocaleSwitcher.vue";

export default {
  components: {
    LocaleSwitcher,
  },
};
</script>

<style>
#nav {
  text-align: center;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: whitesmoke;
  background: crimson;
  border-radius: 0.5rem;
}
</style>
