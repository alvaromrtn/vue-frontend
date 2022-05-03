<template>
  <!-- navbar -->
  <div id="nav">
    <nav class="container navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">Logo Here</a>
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
            >Titulaciones</router-link
          >
          <router-link to="/profesores" class="nav-link"
            >Profesores</router-link
          >
          <router-link to="/contacto" class="nav-link">Contacto</router-link>
        </div>
      </div>
    </nav>
  </div>
</template>
