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
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="pagination">
      <button @click="goToPreviousPage" :disabled="nextPage === 1" class="btn btn-primary">Anterior</button>
      <div class="page-indicator">
        <div class="page-number">{{ nextPage - 1 }}</div>
        <div class="page-number">{{ nextPage - 1 + hasNextPage }}</div>
      </div>
      <button @click="goToNextPage" :disabled="!hasNextPage" class="btn btn-primary">Siguiente</button>
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
      hasNextPage: true
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

.page-separator {
  margin: 0 10px;
}
</style>
