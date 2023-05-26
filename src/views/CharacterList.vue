<template>
  <div>
    <h1>Lista de Personajes de Rick and Morty</h1>
    <div class="container">
      <div class="row">
        <div class="col-lg-3 col-md-4 col-sm-6" v-for="character in displayedCharacters" :key="character.id">
          <div class="card mb-3">
            <img :src="character.image" :alt="character.name" class="card-img-top" width="100">
            <div class="card-body">
              <h5 class="card-title">{{ character.name }}</h5>
              <div class="d-flex  align-items-center">
                <input type="button" value="Seleccionar" @click="toggleSelection(character)" :class="isSelected(character) ? 'btn btn-primary' : 'btn btn-secondary'">
                <div class="mx-4"></div>
                <button @click="viewDetails(character)" class="btn btn-info p-1">Ver detalle</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="selectedCharacters.length > 0">
      <h2>Personajes seleccionados:</h2>
      <ul class="selected-characters-list">
        <li v-for="character in selectedCharacters" :key="character.id">
          <div>
            <h4>{{ character.name }}</h4>
            <img :src="character.image" :alt="character.name" width="100">
            <p>Estado: {{ character.status }}</p>
            <p>Especie: {{ character.species }}</p>
            <!-- Agrega cualquier otra información que desees mostrar -->
          </div>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>No has seleccionado ningún personaje.</p>
    </div>

    <nav class="pagination-container" aria-label="Pagination">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
          <a class="page-link" href="#" @click="previousPage" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item" v-for="page in totalPages" :key="page" :class="{ 'active': currentPage === page }">
          <a class="page-link" href="#" @click="goToPage(page)">{{ page }}</a>
        </li>
        <li class="page-item" :class="{ 'disabled': currentPage === totalPages }">
          <a class="page-link" href="#" @click="nextPage" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      characters: [],
      selectedCharacters: [],
      currentPage: 1,
      charactersPerPage: 12
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.characters.length / this.charactersPerPage);
    },
    displayedCharacters() {
      const start = (this.currentPage - 1) * this.charactersPerPage;
      const end = start + this.charactersPerPage;
      return this.characters.slice(start, end);
    }
  },
  created() {
    this.fetchCharacters();
  },
  methods: {
    fetchCharacters() {
      axios.get('https://rickandmortyapi.com/api/character')
          .then(response => {
            this.characters = response.data.results;
          })
          .catch(error => {
            console.error(error);
          });
    },
    toggleSelection(character) {
      if (this.isSelected(character)) {
        this.selectedCharacters = this.selectedCharacters.filter(c => c.id !== character.id);
      } else {
        if (this.selectedCharacters.length < 3) {
          this.selectedCharacters.push(character);
        } else {
          alert('Solo puedes seleccionar un máximo de tres personajes.');
        }
      }
    },
    isSelected(character) {
      return this.selectedCharacters.some(c => c.id === character.id);
    },
    viewDetails(character) {
      this.$router.push({ name: 'characterDetails', params: { id: character.id } });
    },
    goToPage(page) {
      this.currentPage = page;
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    }
  }
};
</script>

<style>
.card {
  margin-bottom: 10px;
}

.selected-characters-list {
  list-style-type: none;
  padding-left: 0;
}

.pagination-container {
  margin-top: 20px;
}

.d-flex {
  display: flex;
}

.d-flex input,
.d-flex button {
  flex: 1;
}
</style>
