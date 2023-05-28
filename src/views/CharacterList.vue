<template>
  <div>
    <h2>Personajes de Rick and Morty</h2>

    <div class="container">
      <div class="row">
        <div v-for="character in characters" :key="character.id" class="col-lg-3 col-md-6 col-sm-12">
          <div class="card mb-3">
            <img :src="character.image" :alt="character.name" class="card-img-top">
            <div class="card-body">
              <h5 class="card-title">{{ character.name }}</h5>
              <input type="button"
                     :value="isSelected(character) ? 'Seleccionado' : 'Seleccionar'"
                     @click="toggleSelection(character)"
                     :class="isSelected(character) ? 'btn btn-primary' : 'btn btn-secondary'">
              <button @click="viewSelectedDetails" class="btn btn-info">Ver detalles</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="pagination d-flex justify-content-center p-5">
      <button @click="goToPreviousPage" :disabled="currentPage === 1" class="btn btn-primary btn-sm">&laquo;</button>
      <div class="page-indicator">
        <div class="page-number">{{ currentPage }}</div>
        <div class="page-number">{{ currentPage + 1 }}</div>
      </div>
      <button @click="goToNextPage" :disabled="!hasNextPage" class="btn btn-primary btn-sm">&raquo;</button>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

export default {
  data() {
    return {
      showDetails: false,
      currentPage: 1,
    }
  },
  computed: {
    ...mapGetters(['characters', 'hasNextPage', 'selectedCharacters']),
  },
  methods: {
    ...mapActions(['loadCharacters', 'toggleCharacterSelection', 'viewCharacterDetails', 'resetSelection']),
    toggleSelection(character) {
      this.toggleCharacterSelection(character);
    },
    isSelected(character) {
      return this.selectedCharacters.some(c => c.id === character.id);
    },
    viewSelectedDetails() {
      if (this.selectedCharacters.length === 0) {
        alert('No has seleccionado ningún personaje.');
        return;
      }

      this.$router.push('/characterDetails');
    },
    goToPreviousPage() {
      if (this.currentPage > 1) {
        this.loadCharacters(this.currentPage - 1);
      }
    },
    goToNextPage() {
      if (this.hasNextPage) {
        this.loadCharacters(this.currentPage + 1);
      }
    },
    loadCharacters(page) {
      this.currentPage = page; // Actualizar la página actual
      this.$store.dispatch('loadCharacters', page);
    },
    resetSelection() {
      this.$store.commit('resetSelectedCharacters');
    }
  },
  created() {
    this.loadCharacters(this.currentPage); // Cargar los personajes de la página actual
  }
};
</script>

<style>
/* Estilos del componente */
</style>

<style>
.page-indicator {
  display: flex;
  align-items: center;
}

.page-number {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background-color: #e6e6e6;
  border: 1px solid #ccc;
  font-weight: bold;
}

.selected-characters {
  margin-top: 20px;
}

.selected-characters .card {
  width: 200px;
  margin-right: 10px;
  display: inline-block;
}

.selected-characters .card-img-top {
  height: 200px;
  object-fit: cover;
}

.selected-characters .card-body {
  padding: 10px;
  height: 200px;
  object-fit: cover;
  display: inline-block;
}
</style>
