<template>
  <div class="container">
    <h1>Detalles del Personaje</h1>
    <div class="row">
      <div class="col-md-6" style="width: auto">
        <div v-if="selectedCharacter" class="card">
          <div class="row no-gutters">
            <div class="col-md-4">
              <img :src="selectedCharacter.image" :alt="selectedCharacter.name" class="card-img" style="max-height: 300px;">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <ul class="selected-character-details ">
                  <li><strong>ID:</strong> {{ selectedCharacter.id }}</li>
                  <li><strong>Status:</strong> {{ selectedCharacter.status }}</li>
                  <li><strong>Species:</strong> {{ selectedCharacter.species }}</li>
                  <li><strong>Type:</strong> {{ selectedCharacter.type }}</li>
                  <li><strong>Gender:</strong> {{ selectedCharacter.gender }}</li>
                  <li><strong>Origin:</strong> {{ selectedCharacter.origin.name }}</li>
                  <li><strong>Location:</strong> {{ selectedCharacter.location.name }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      selectedCharacter: null
    };
  },
  created() {
    this.loadCharacterDetails();
  },
  methods: {
    loadCharacterDetails() {
      const characterId = this.$route.params.id;
      this.fetchCharacters().then(() => {
        this.selectedCharacter = this.characters.find(character => character.id === characterId);
      });
    },
    fetchCharacters() {
      return axios.get('https://rickandmortyapi.com/api/character')
          .then(response => {
            this.characters = response.data.results;
          })
          .catch(error => {
            console.error(error);
          });
    }
  }
};
</script>

<style>
.container {
  margin-top: 20px;
}

.selected-character-details {
  list-style-type: none;
  padding-left: 0;
  margin-top: 0;
}

.selected-character-details li {
  margin-bottom: 5px;
  text-align: initial;
}

.card {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
}

.card-img {
  object-fit: cover;
  height: 300px;
}

@media (max-width: 576px) {
  .card-img {
    height: auto;
    width: 100%;
  }
}
</style>
