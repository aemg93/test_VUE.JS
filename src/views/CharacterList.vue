<template>
  <div>
    <h2 class="m-5">Personajes de Rick and Morty</h2>

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
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      showDetails: false,
      currentPage: 1,
    };
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
        this.showAlert('No has seleccionado ningún personaje.', 'success');
        return;
      }

      this.$router.push('/characterDetails');
    },
    showAlert(message, style) {
      const alertElement = document.createElement('div');
      alertElement.style.backgroundColor = style === 'success' ? '#28a745' : '#dc3545';
      alertElement.style.color = '#fff';
      alertElement.style.padding = '10px';
      alertElement.style.borderRadius = '5px';
      alertElement.style.position = 'fixed';
      alertElement.style.top = '50%';
      alertElement.style.left = '50%';
      alertElement.style.transform = 'translate(-50%, -50%)';
      alertElement.innerText = message;

      document.body.appendChild(alertElement);

      setTimeout(() => {
        document.body.removeChild(alertElement);
      }, 3000);
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
      this.currentPage = page;
      this.$store.dispatch('loadCharacters', page);
    },
    resetSelection() {
      this.$store.commit('resetSelectedCharacters');
    },
  },
  created() {
    this.loadCharacters(this.currentPage);
  },
};
</script>

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

.card-title {
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transform: scale(1);
  transition: transform 0.3s ease;
}

.card:hover .card-title {
  transform: scale(0.9);
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
