<template>
  <div class="gif">
    <img :src="cargaURL" class="img-responsive" height="100" width="100" />
  </div>
</template>

<script setup>
import cargaURL from "../assets/gifs/carga-1.gif";
</script>

<style>
.gif {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
}
</style>
