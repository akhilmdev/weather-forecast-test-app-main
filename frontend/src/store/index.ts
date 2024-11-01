import { createStore } from "vuex";

export default createStore({
  state: {
    selectedPlace: null,
  },
  getters: {
    getSelectedPlace: (state) => state.selectedPlace,
  },
  mutations: {
    setSelectedPlace(state, place) {
      state.selectedPlace = place;
    },
  },
  actions: {
    updateSelectedPlace({ commit }, place) {
      commit("setSelectedPlace", place);
    },
  },
  modules: {},
});
