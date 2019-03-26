<template>
  <div class="laCard">
    <v-layout class="laCard">
      <v-card class="pointer" flat width="100%" v-for="(item, index) in contenido" :key="index" v-on:click="renderTemplate(item.key)">
        <v-img :src="require(`../assets/fotos/${item.imagen}`) " aspect-ratio="1.5"></v-img>

        <v-card-title primary-title>
          <div class="contenidoDeLaCard">
            <h3>{{item.titulo}}</h3>
            <p>{{item.contenido}}...</p>
            <div class="calendario">
              <div class="fecha"></div>
              <div class="etiqueta"></div>
            </div>
          </div>
        </v-card-title>
      </v-card>
    </v-layout>
  </div>
</template>

<script>
import data from "../assets/database/articulos.json";
export default {
  data() {
    return {
      contenido:{},
    };
  },
  methods:{
    renderTemplate(key){

      this.$store.commit("changekey", key);
      this.$router.push("/template")
    },
    cortaTextos(){
      for (const a in this.contenido) {
        if (this.contenido.hasOwnProperty(a)) {
          this.contenido[a].contenido =  this.contenido[a].contenido.slice(0, 400)
          
        }
      }
    }
  },
  mounted() {
    this.contenido = data;
    this.cortaTextos();
  },
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

.laCard{
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    grid-gap: 3rem;
}

.contenidoDeLaCard h3{
text-align: center;
font-size: 1.8rem;
letter-spacing: 0.1rem;
margin-bottom: 1rem;
}

.contenidoDeLaCard p{
    text-align: center;
    font-family: MaratFina;
    font-size: 1.2rem;
}

.pointer{
  cursor: pointer;
}
</style>
