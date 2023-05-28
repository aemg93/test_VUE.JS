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
    selectedCharacterId: null,
    isLoading: false,
    isError: false
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
        alert('Se puede seleccionar hasta tres elementos de la lista.');
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
    },
    resetSelectedCharacters(state) {
      state.selectedCharacters = [];
    },
    setLoadingState(state, isLoading) {
      state.isLoading = isLoading;
    },
    setErrorState(state, isError) {
      state.isError = isError;
    }
  },
  actions: {
    async loadCharacters({ commit }, page) {
      try {
        commit('setLoadingState', true);
        const response = await axios.get(`https://rickandmortyapi.com/api/character?page=${page}`);
        const { results, info } = response.data;
        commit('setCharacters', results);
        commit('setNextPage', info.next ? info.next.match(/\d+/)[0] : null);
        commit('setHasNextPage', !!info.next);
        commit('setErrorState', false); // Clear error state if successful
      } catch (error) {
        console.error('Error loading characters:', error);
        commit('setErrorState', true); // Set error state
      } finally {
        commit('setLoadingState', false);
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
    },
    resetSelectedCharacters({ commit }) {
      commit('resetSelectedCharacters');
    },
  },
  getters: {
    characters: state => state.characters,
    nextPage: state => state.nextPage,
    hasNextPage: state => state.hasNextPage,
    selectedCharacters: state => state.selectedCharacters,
    selectedCharacterDetails: state => state.selectedCharacterDetails,
    selectedCharacter: state => {
      return state.characters.find(c => c.id === state.selectedCharacterId);
    },
    isLoading: state => state.isLoading,
    isError: state => state.isError
  }
});
