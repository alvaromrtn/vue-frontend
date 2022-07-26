<template>
  <aside class="sidebar">
    <div class="logo">
      <img :src="logoURL" alt="logo" />
    </div>

    <h3>MENÚ</h3>
    <div class="menu">
      <router-link to="/" class="button">
        <span class="material-icons">home</span>
        <span class="text">Inicio</span>
      </router-link>
      <router-link to="/titulaciones" class="button">
        <span class="material-icons">school</span>
        <span class="text">Titulaciones</span>
      </router-link>
      <router-link to="/asignaturas" class="button">
        <span class="material-icons">menu_book</span>
        <span class="text">Asignaturas</span>
      </router-link>
      <router-link to="/profesores" class="button">
        <span class="material-icons">person</span>
        <span class="text">Profesores</span>
      </router-link>
      <router-link to="/contacto" class="button">
        <span class="material-icons">email</span>
        <span class="text">Contacto</span>
      </router-link>
    </div>
  </aside>
</template>

<script setup>
import logoURL from "../../assets/images/logoUSAL.png";
</script>

<style lang="scss" scoped>
aside {
  display: flex;
  flex-direction: column;

  background-color: var(--dark);
  color: var(--light);

  width: 5rem;
  overflow: hidden;
  min-height: 100vh;
  min-width: 200px;
  padding: 1rem;

  .logo {
    margin-bottom: 1rem;
    margin-left: auto;
    margin-right: auto;
    img {
      width: 5rem;
    }
  }

  h3 .button .text {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  h3 {
    color: var(--grey);
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
  }

  .menu {
    margin: 0 -1rem;

    .button {
      display: flex;
      align-items: center;
      text-decoration: none;

      transition: 0.2s ease-in-out;
      padding: 0.5rem 1rem;

      .material-icons {
        font-size: 2rem;
        color: var(--light);
        transition: 0.2s ease-in-out;
      }

      .text {
        color: var(--light);
        transition: 0.2s ease-in-out;
      }

      &:hover {
        background-color: var(--dark-alt);

        .text {
          color: var(--primary);
        }
      }

      &.router-link-exact-active {
        background-color: var(--dark-alt);
        border-right: 5px solid var(--primary);

        .text {
          color: var(--primary);
        }
      }
    }
  }

  &.sidebar {
    h3 .button .text {
      opacity: 1;
    }

    .button {
      .material-icons {
        margin-right: 1rem;
      }
    }
  }
}
</style>
