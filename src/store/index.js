// En tu archivo store.js

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    selectedCharacters: {
      state: {
        selectedCharacters: []
      },
      mutations: {
        addSelectedCharacter(state, character) {
          state.selectedCharacters.push(character);
        },
        removeSelectedCharacter(state, character) {
          state.selectedCharacters = state.selectedCharacters.filter(c => c.id !== character.id);
        }
      }
    }
  }
});
