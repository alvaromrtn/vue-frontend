<template>
  <div class="container">
    <div class="texto">
      <h1>No existe información</h1>
    </div>
  </div>
</template>

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
