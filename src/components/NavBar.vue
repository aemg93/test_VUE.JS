<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-info" :class="{ 'navbar-scrolled': isScrolled }">
      <button class="navbar-toggler mx-2" type="button" data-toggle="collapse" data-target="#navbarNav"
              aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" @click="toggleMenu">
        <i class='bx bx-menu'></i>
      </button>
      <div class="collapse navbar-collapse mx-5" :class="{ 'show': isMenuOpen }">
        <ul class="navbar-nav ml-auto text-start">
          <li class="nav-item">
            <router-link class="nav-link text-dark" to="/">Lista de personajes</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-dark" to="/CharacterDetails">Detalle de personajes</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link text-dark" @click.prevent="resetSelection" href="#">
              Reset
            </a>
          </li>
        </ul>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      isMenuOpen: false,
      isScrolled: false
    };
  },
  methods: {
    ...mapActions(['loadCharacters', 'toggleCharacterSelection', 'viewCharacterDetails', 'resetSelection']),
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    handleScroll() {
      this.isScrolled = window.pageYOffset > 0;
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
};
</script>

<style>
.navbar-scrolled {
  position: fixed;
  top: 0;
  width: 100%;
  /* Estilos adicionales para el navbar cuando se hace scroll */
}
.nav-link {
  font-weight: bold;
}
</style>
