<template>
  <div class="container">
    <h4 class="mt-5">Detalles de los personajes seleccionados:</h4>
    <div v-if="isLoading" class="loading-animation">
      <div class="spinner"></div>
    </div>
    <div v-else>
      <div class="row justify-content-center flex-column align-content-around">
        <div v-for="character in selectedCharacters" :key="character.name" class="col-sm-12 col-md-6 col-lg-6">
          <div class="card py-3 my-1">
            <div class="d-flex">
              <div class="card-image">
                <img :src="character.image" :alt="character.name" class="character-image">
              </div>
              <div class="card-content text-start mx-3">
                <h5 class="card-title">{{ character.name }}</h5>
                <p class="card-text">Nombre: {{ character.name }}</p>
                <p class="card-text">Origen: {{ character.origin.name }}</p>
                <p class="card-text">Estado: {{ character.status }}</p>
                <p class="card-text">Género: {{ character.gender }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="selectedCharacters.length === 0" class="alert alert-info mt-3" role="alert">
        No se ha seleccionado ningún personaje.
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters(['selectedCharacters', 'isLoading']),
  },
  watch: {
    isLoading(newLoadingState) {
      this.isLoading = newLoadingState;
    },
  },
};
</script>

<style>
.container {
  max-width: 1200px;
  margin: 0 auto;
}

.card {
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
  padding: 10px;
}

.card-image {
  text-align: right;
  width: 150px;
  height: 150px;
  overflow: hidden;
}

.character-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-title {
  margin-bottom: 0;
}

.card-text {
  margin-bottom: 5px;
}

.loading-animation {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}

.spinner {
  border: 8px solid #f3f3f3;
  border-top: 8px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
