<template>
  <div>
    <h2 class="m-5">Personajes de Rick and Morty</h2>
    <div v-if="isLoading" class="loading-animation">
      <div class="spinner"></div>
    </div>
    <div v-else-if="isError" class="error-message">
      Ha ocurrido un error al cargar los datos. Por favor, intenta nuevamente.
    </div>
    <div v-else class="container">
      <div class="row">
        <div v-for="character in characters" :key="character.id" class="col-lg-3 col-md-6 col-sm-12">
          <div class="card mb-3">
            <img :src="character.image" :alt="character.name" class="card-img-top">
            <div class="card-body">
              <h5 class="card-title">{{ character.name }}</h5>
              <div class="input-button-container">
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
    ...mapGetters(['characters', 'hasNextPage', 'selectedCharacters', 'isLoading', 'isError']),
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

.loading-animation {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}

.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-message {
  margin: 10px;
  padding: 10px;
  background-color: #dc3545;
  color: #fff;
  border-radius: 5px;
}

.input-button-container {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
</style>
