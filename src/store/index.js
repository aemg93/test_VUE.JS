import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    characters: [],
    nextPage: 1,
    hasNextPage: false,
    selectedCharacters: [],
    selectedCharacterDetails: null,
    selectedCharacterId: null
  },
  mutations: {
    setCharacters(state, characters) {
      state.characters = characters;
    },
    setNextPage(state, nextPage) {
      state.nextPage = nextPage;
    },
    setHasNextPage(state, hasNextPage) {
      state.hasNextPage = hasNextPage;
    },
    addSelectedCharacter(state, character) {
      if (state.selectedCharacters.length < 3) {
        state.selectedCharacters.push(character);
      } else {
        alert('Solo puedes seleccionar hasta tres personajes.');
      }
    },
    removeSelectedCharacter(state, character) {
      state.selectedCharacters = state.selectedCharacters.filter(c => c.id !== character.id);
    },
    setSelectedCharacterDetails(state, character) {
      state.selectedCharacterDetails = character;
    },
    setSelectedCharacterId(state, characterId) {
      state.selectedCharacterId = characterId;
    }
  },
  actions: {
    async loadCharacters({ commit }, page) {
      try {
        const response = await axios.get(`https://rickandmortyapi.com/api/character?page=${page}`);
        const { results, info } = response.data;
        commit('setCharacters', results);
        commit('setNextPage', info.next ? info.next.match(/\d+/)[0] : null);
        commit('setHasNextPage', !!info.next);
      } catch (error) {
        console.error('Error loading characters:', error);
      }
    },
    toggleCharacterSelection({ commit, state }, character) {
      const isSelected = state.selectedCharacters.some(c => c.id === character.id);
      if (isSelected) {
        commit('removeSelectedCharacter', character);
      } else {
        commit('addSelectedCharacter', character);
      }
    },
    viewCharacterDetails({ commit, state }, characterId) {
      const character = state.characters.find(c => c.id === characterId);
      if (character) {
        commit('setSelectedCharacterId', characterId);
        commit('setSelectedCharacterDetails', character);
      }
    }
  },
  getters: {

    characters: state => state.characters,
    nextPage: state => state.nextPage,
    hasNextPage: state => state.hasNextPage,
    selectedCharacters: state => state.selectedCharacters,
    selectedCharacterDetails: state => state.selectedCharacterDetails,
    selectedCharacter: state => {
      return state.characters.find(c => c.id === state.selectedCharacterId);
    }
  }
});
