<template>
  <div id="app">
    <nav-bar />
    <mi-footer />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import MiFooter from "@/components/MiFooter.vue";

export default {
  name: 'App',
  components: {
    NavBar,
    MiFooter
  }
};
</script>

<style>
body {
  background-color: #000;
}
#app {
  font-family: Arial, sans-serif;
  text-align: center;
}
</style>
