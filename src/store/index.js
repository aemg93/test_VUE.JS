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
    selectedCharacterDetails: null
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
      state.selectedCharacters.push(character);
    },
    removeSelectedCharacter(state, character) {
      state.selectedCharacters = state.selectedCharacters.filter(c => c.id !== character.id);
    },
    setSelectedCharacterDetails(state, character) {
      state.selectedCharacterDetails = character;
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
    viewCharacterDetails({ commit }, character) {
      commit('setSelectedCharacterDetails', character);
    }
  },
  getters: {
    characters: state => state.characters,
    nextPage: state => state.nextPage,
    hasNextPage: state => state.hasNextPage,
    selectedCharacters: state => state.selectedCharacters,
    selectedCharacterDetails: state => state.selectedCharacterDetails
  }
});
