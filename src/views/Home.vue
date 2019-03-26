<template>
  <div>
    <navbar/>
    <div class="homeWrapper">
      <div class="subheader">
        <h2>Blog</h2>
        <p>
          Our everyday thoughts are presented here
          <br>Music, video presentations, photo-shootings and more.
        </p>
      </div>
      <div class="divisionadoVertical">
        <div class="contenidoDelBlog">
          <bigCards/>
        </div>
        <div class="columnaDeLaIzquierda">
          <columnaDerecha/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navbar from "../components/navbar.vue";
import appFooter from "../components/appFooter.vue";
import bigCards from "../components/bigCards.vue";
import columnaDerecha from "../components/columnaDerecha.vue";

export default {
  data() {
    return {
      mifoto: "mifoto.png"
    };
  },
  components: {
    navbar,
    appFooter,
    bigCards,
    columnaDerecha
  }
};
</script>

<style scoped>
.homeWrapper {
  padding: 0 8rem;
  padding-top: 3.5rem;
  background-color: #f5f5f5;
  height: 100vh;
  width: 100vw;
}

.subheader {
  margin-bottom: 3rem;
}

.subheader h2 {
  font-family: "Libre Baskerville", serif;
}

.subheader p {
  font-family: sans-serif;
  margin-top: 1rem;
}

.divisionadoVertical {
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-gap: 2rem;
}

@media only screen and (max-width: 1000px) {
  .divisionadoVertical {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 2rem;
  }
  .homeWrapper {
    padding: 0 4rem;
    padding-top: 3.5rem;
    background-color: #f5f5f5;
    height: 100vh;
    width: 100vw;
  }
}


/*-------------- IPHONE 5 ----------------*/
@media only screen and (min-device-width : 320px) and (max-device-width : 568px) and (orientation : portrait) { 
  
  .homeWrapper {
    padding: 0 0.2rem;
    padding-top: 3.5rem;
    background-color: #f5f5f5;
    height: 100vh;
    width: 100vw;
  }
}
/*-------------- IPHONE 6 ----------------*/
@media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (orientation: portrait) {
  .homeWrapper {
    padding: 0 1rem;
    padding-top: 3.5rem;
    background-color: #f5f5f5;
    height: 100vh;
    width: 100vw;
  }
}

/*---------------- IPAD ----------------*/
@media only screen 
and (min-device-width : 768px) 
and (max-device-width : 1024px)  { 
  
  .homeWrapper {
    padding: 0 3rem;
    padding-top: 3.5rem;
    background-color: #f5f5f5;
    height: 100vh;
    width: 100vw;
  }
}

</style>



font-family: 'Roboto Mono', monospace;
font-family: 'Libre Baskerville', serif;
font-family: 'Playfair Display SC', serif;