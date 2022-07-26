<template>
  <main id="home" style="width: 1000px">
    <h1>HOME</h1>
    <p>Página Home</p>
  </main>
</template>

<script>
export default {
  name: "HomeScript",
  watch: {
    title: {
      immediate: true,
      handler() {
        document.title = "Inicio";
      },
    },
  },
};
</script>
