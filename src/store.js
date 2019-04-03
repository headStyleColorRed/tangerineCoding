import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    articulo:{},
    biblioteca:{
      nada: true
    },
    bibliotecaTest:{
      nada: true
    },
    key:"",
    loaded: false,
    search: "",

  },
  mutations: {
    changeArticulo(state, articulo) {
      state.articulo = articulo;
    },
    changeBiblioteca(state, biblioteca) {
      state.biblioteca = biblioteca;
    },
    changeBibliotecaTest(state, bibliotecaTest) {
      state.bibliotecaTest = bibliotecaTest;
    },
    changeKey(state, key) {
      state.key = key;
    },
    changeLoaded(state, loaded) {
      state.loaded = loaded;
    },
    changeSearch(state, search) {
      state.search = search;
    },
  },
  getters: {
    articulo: state => state.articulo,
    biblioteca: state => state.biblioteca,
    bibliotecaTest: state => state.bibliotecaTest,
    key: state => state.key,
    loaded: state => state.loaded,
    search: state => state.search,
  }
})
