<template>
  <main id="contacto" style="width: 1000px">
    <h1>CONTACTO</h1>
    <p>Página Contacto</p>
  </main>
</template>

<script>
export default {
  name: "ContactoScript",
  watch: {
    title: {
      immediate: true,
      handler() {
        document.title = "Contacto";
      },
    },
  },
};
</script>
