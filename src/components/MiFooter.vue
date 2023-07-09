<template>
  <footer class="footer">
    <div class="footer-content mx-5">
      <img src="https://assets.stickpng.com/images/58f37720a4fa116215a9240f.png" alt="morty" class="footer-title">
      <img src="https://www.freepnglogos.com/uploads/rick-and-morty-png/rick-and-morty-ruefers-deviantart-22.png" alt="Imagen" class="footer-image">

    </div>
  </footer>
</template>

<style>
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  min-height: 100%;
  display: flex;
  flex-direction: column;
}

.footer {
  background-color: #0a0a0a;
  padding: 20px;
  margin-top: auto;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-title {
  width: 300px;
  height: 100px;
}

.footer-image {
  max-width: 100px;
  max-height: 100px;
}
</style>
