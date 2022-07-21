<template>
  <aside class="is-expanded">
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

    <div class="flex"></div>

    <div class="menu">
      <router-link to="/ajustes" class="button">
        <span class="material-icons">settings</span>
        <span class="text">Ajustes</span>
      </router-link>
    </div>
  </aside>
</template>

<script setup>
import { ref } from "vue";
import logoURL from "../../assets/logoUSAL.png";

const expandido = ref(localStorage.getItem("is_expanded") === "true");

const expandirMenu = () => {
  expandido.value = !expandido.value;
  localStorage.setItem("is_expanded", expandido.value);
};
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

  .flex {
    flex: 1 1 0%;
  }

  .logo {
    margin-bottom: 1rem;

    img {
      width: 5rem;
    }
  }

  .menu-toggle-wrap {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;

    position: relative;
    top: 0;
    transition: 0.2s ease-in-out;

    .menu-toggle {
      transition: 0.2s ease-in-out;
      .material-icons {
        font-size: 2rem;
        color: var(--light);
        transition: 0.2s ease-out;
      }

      &:hover {
        .material-icons {
          color: var(--primary);
          transform: translateX(0.5rem);
        }
      }
    }
  }

  h3,
  .button .text {
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

        .material-icons,
        .text {
          color: var(--primary);
        }
      }

      &.router-link-exact-active {
        background-color: var(--dark-alt);
        border-right: 5px solid var(--primary);

        .material-icons,
        .text {
          color: var(--primary);
        }
      }
    }
  }

  &.is-expanded {
    width: var(--sidebar-width);

    h3,
    .button .text {
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
