<template>
  <div style="backgroundColor: #f5f5f5;">
    <navbar/>
    <div class="templateWrapper">
      <div class="titulo">
        <h1>{{articulo.titulo}}</h1>
      </div>
      <div class="imagen">
        <v-img
          class="imagenFoto"
          :src="require(`../assets/fotos/${articulo.imagen}`) "
          aspect-ratio="1.5"
        ></v-img>
      </div>
      <div class="divContenido">
        <p>{{articulo.contenido}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import navbar from "../components/navbar.vue";
import data from "../assets/database/articulos.json";
export default {
  data() {
    return {
      articulo: {}
    };
  },
  methods: {},
  mounted() {
    let lakey = this.$store.getters.key;
    this.articulo = data[lakey];
  },
  components: {
    navbar
  }
};
</script>

<style scoped>
@font-face {
  font-family: MaratFina;
  src: url("../assets/fonts/Marats/MaratSansLight.otf");
}

@font-face {
  font-family: Optima;
  src: url("../assets/fonts/Optimas/OptimaMedium.ttf");
}

.templateWrapper {
  padding: 7rem 15rem;
  display: grid;
  grid-gap: 3rem;
}

.titulo {
  text-align: center;
  font-family: "Libre Baskerville", serif;
}

.imagenFoto {
  height: 30rem;
}

.divContenido {
  margin: 0 8rem;
  font-family: MaratFina;
  font-size: 1.6rem;
}
</style>
