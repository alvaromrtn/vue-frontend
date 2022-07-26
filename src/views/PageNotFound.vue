<template>
  <div class="container">
    <div class="texto">
      <h1>Error 404</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageNotFoundScript",
  watch: {
    title: {
      immediate: true,
      handler() {
        document.title = "Página no encontrada";
      },
    },
  },
};
</script>

<style>
.container {
  width: 100%;
  height: 100%;
}

.texto {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
}

.texto h1 {
  font-size: 40px;
  padding-right: 12px;
  animation: type 0.5s alternate infinite;
}

@keyframes type {
  from {
    box-shadow: inset -3px 0px 0px black;
  }
  to {
    box-shadow: inset -3px 0px 0px transparent;
  }
}
</style>
