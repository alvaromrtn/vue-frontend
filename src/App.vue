<template>
  <div id="app">
    <NavBar />

    <router-view />

    <FooterView />
  </div>
</template>

<script>
import NavBar from "./views/NavBar";
import FooterView from "./views/FooterView";

export default {
  name: "App",
  components: {
    NavBar,
    FooterView,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#nav {
  padding: 30px;
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
