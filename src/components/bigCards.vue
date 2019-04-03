<template>
  <div class="laCard">
    <v-layout class="laCard">
      <v-card
        class="pointer"
        flat
        width="100%"
        v-for="(item, index) in this.$store.getters.biblioteca"
        :key="index"
        v-on:click="renderTemplate(item, index)"
      >
        <v-img :src="item.imagen " aspect-ratio="1.5"></v-img>

        <v-card-title primary-title>
          <div class="contenidoDeLaCard">
            <h3 v-html="item.titulo"></h3>
            <p v-html="item.contenido.slice(0,399)"></p>
            <div class="calendario">
              <div class="fecha">
              {{item.fecha}}
              </div>
            </div>
          </div>
        </v-card-title>
      </v-card>
    </v-layout>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      contenido: {},
    };
  },
  methods: {
    renderTemplate(item) {
      this.$store.commit("changeArticulo", item);
      this.$store.commit("changeKey", item.key);
      this.$router.push({path: "/template", query: {articulo: `${item.key}`}});
    },
  },
  mounted() {
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

.laCard {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-gap: 3rem;
}

.contenidoDeLaCard h3 {
  text-align: center;
  font-size: 1.8rem;
  letter-spacing: 0.1rem;
  margin-bottom: 1rem;
}

.contenidoDeLaCard p {
  text-align: center;
  font-family: MaratFina;
  font-size: 1.2rem;
}

.fecha{
  text-align: center;
  color: rgb(167, 167, 167);
  font-size: 0.75rem;
  font-family: lato;
}

.pointer {
  cursor: pointer;
}
</style>
