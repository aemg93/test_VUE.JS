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
              <input type="button" :value="isSelected(character) ? 'Seleccionado' : 'Seleccionar'" @click="toggleSelection(character)" :class="isSelected(character) ? 'btn btn-primary' : 'btn btn-secondary'">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="selected-characters">
      <h4>Personajes seleccionados:</h4>
      <div v-for="character in selectedCharacters" :key="character.id" class="card">
        <img :src="character.image" :alt="character.name" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">{{ character.name }}</h5>
          <p>{{ character.species }} | {{ character.status }}</p>
          <button @click="viewDetails(character)" class="btn btn-info">Ver detalles</button>
        </div>
      </div>
    </div>
    <div class="pagination d-flex justify-content-center pt-2">
      <button @click="goToPreviousPage" :disabled="nextPage === 1" class="btn btn-primary btn-sm">Anterior</button>
      <div class="page-indicator">
        <div class="page-number">{{ nextPage - 1 }}</div>
        <div class="page-number">{{ nextPage - 1 + hasNextPage }}</div>
      </div>
      <button @click="goToNextPage" :disabled="!hasNextPage" class="btn btn-primary btn-sm">Siguiente</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      characters: [],
      nextPage: 1,
      hasNextPage: true,
      selectedCharacters: []
    };
  },
  methods: {
    loadCharacters(page) {
      const url = `https://rickandmortyapi.com/api/character?page=${page}`;

      axios.get(url)
          .then(response => {
            this.characters = response.data.results;
            this.hasNextPage = !!response.data.info.next;
            if (this.hasNextPage) {
              this.nextPage = response.data.info.next.split('=')[1];
            }
          })
          .catch(error => {
            console.log(error);
          });
    },
    goToPreviousPage() {
      if (this.nextPage > 1) {
        this.loadCharacters(this.nextPage - 1);
      }
    },
    goToNextPage() {
      if (this.hasNextPage) {
        this.loadCharacters(this.nextPage);
      }
    },
    toggleSelection(character) {
      if (this.isSelected(character)) {
        this.selectedCharacters = this.selectedCharacters.filter(c => c.id !== character.id);
      } else {
        if (this.selectedCharacters.length < 3) {
          this.selectedCharacters.push(character);
        } else {
          alert('¡Solo se pueden seleccionar hasta tres personajes!');
        }
      }
    },
    isSelected(character) {
      return this.selectedCharacters.some(c => c.id === character.id);
    },
    viewDetails(character) {
      // Aquí puedes implementar la lógica para mostrar los detalles del personaje seleccionado
      console.log('Detalles del personaje:', character);
    }
  },
  created() {
    this.loadCharacters(this.nextPage);
  }
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
}
</style>
