<template>
  <div id="app">
    <Profesor/>
  </div>
</template>

<script>
import Profesor from './components/Profesor.vue'

export default {
  name: 'App',
  components: {
    Profesor
}
}
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
</style>
