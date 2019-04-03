<template>
  <div style="backgroundColor: #f5f5f5; height:100vh;">
    <vue-scroll-progress-bar backgroundColor="#F0DB4F" height="0.3rem"/>
    <navbar/>

    <div v-if="loading" class="templateWrapper" v-scroll="onScroll">
      <div class="titulo">
        <h1>{{articulo.titulo}}</h1>
      </div>
      <div class="imagen">
        <v-img class="imagenFoto" :src="articulo.imagen " aspect-ratio="1.5"></v-img>
      </div>
      <div class="divContenido" ref="infoBox">
        <p v-html="articulo.contenido"></p>
      </div>

      <!-- MÁS CONTENIDO DE ABAJO-->
      <div class="moremore">
        <v-icon>far fa-plus-square</v-icon>
      </div>
      <div class="moreContent">
        <v-layout class="laCard">
          <v-card
            class="pointer lasCards"
            flat
            width="100%"
            v-for="(item, index) in contenido"
            :key="index"
            v-on:click="renderTemplate(item, index)"
          >
            <v-img :src="item.imagen " aspect-ratio="1.5"></v-img>

            <v-card-title primary-title>
              <div class="contenidoDeLaCard">
                <h3 class="tituloCard" v-html="item.titulo"></h3>
              </div>
            </v-card-title>
          </v-card>
        </v-layout>
      </div>
    </div>

    <!-- C O M E N T A R I O S -->
    <div v-if="comentariosShow" class="comentarios">
      <v-card class="dejarComentario" v-bind:style="{height:creceBichin}">
        <div class="comentarioInside">
          <textarea
            v-model="textoDeComentario"
            v-on:click="creceBichin = '19rem'"
            id="textarea"
            placeholder="Deja un comentario..."
          ></textarea>
        </div>
        <div class="nombreComentador">
          <input class="inputDelEmail" type="text" placeholder="Nombre" v-model="emailDeComentario">
          <v-btn class="botonDeComentario" color="#F0DB4F" v-on:click="guardarComentario()">Publicar</v-btn>
        </div>
      </v-card>

      <div class="separacionComentarios">
        <h3>Comentarios:</h3>
      </div>

      <v-card
        v-for="(comentario, index) in comentarios"
        :key="index"
        class="comentariosRecibidosCard"
      >
        <div class="comentariosRecibidos">
          <p>
            <b>{{comentario.nombre}}</b>
          </p>
          <p class="fechaComentarios">{{comentario.fecha}}</p>
          <p>{{comentario.texto}}</p>
          <v-icon v-if="comentario.liked" class="likyliky">star</v-icon>
          <v-icon v-else class="likyliky">star_border</v-icon>
        </div>
      </v-card>
    </div>

    <!-- Iconos de Sharing-->
    <div v-if="showShare" class="sharing">
      <a
        href="https://twitter.com/intent/tweet?text=Check%20this%20article%20that%20I%20found:%20https://tangerine-coder.firebaseapp.com"
        target="_blank"
      >
        <v-icon class="pointer twitter">fab fa-twitter</v-icon>
      </a>
      <v-icon class="pointer share" v-on:click="sheet = true">share</v-icon>
      <v-icon class="pointer bookmark" v-on:click="guardar('save')" v-if="favourite">bookmark</v-icon>
      <v-icon class="pointer bookmark" v-on:click="guardar('unsave')" v-else>bookmark_border</v-icon>
    </div>

    <div class="bottomSharing">
      <div class="text-xs-center">
        <v-bottom-sheet v-model="sheet">
          <v-list>
            <v-subheader>Open in</v-subheader>
            <v-list-tile v-for="tile in tiles" :key="tile.title" @click="sheet = false">
              <v-list-tile-avatar>
                <v-avatar size="32px" tile>
                  <img
                    :src="`https://cdn.vuetifyjs.com/images/bottom-sheets/${tile.img}`"
                    :alt="tile.title"
                  >
                </v-avatar>
              </v-list-tile-avatar>
              <v-list-tile-title>{{ tile.title }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-bottom-sheet>
      </div>
    </div>
    <v-progress-circular class="loading" v-if="!loading" indeterminate color="primary"></v-progress-circular>
  </div>
</template>

<script>
import navbar from "../components/navbar.vue";
import VueScrollProgressBar from "vue-scroll-progressbar";
import vuescroll from "vue-scroll";
import store from "../store.js";
export default {
  data() {
    return {
      contenido: {},
      articulo: {},
      comentarios: {
        0: {
          nombre: "Rodrigo",
          texto:
            "And i am glad reading your article. But wanna commentary on some normal issues, The website taste is perfect, the articles is in point of fact nice : D. Excellent task, cheers ",
          fecha: "09/2019",
          liked: false
        },
        1: {
          nombre: "Ana López-Rúa Carral",
          texto:
            "Vamos dodi, que te quedan cuatro cosillas de nada :D Tú puedes bichín :3",
          fecha: "10/2019",
          liked: true
        }
      },
      comentariosShow: false,
      favourite: false,
      showShare: false,
      sheet: false,
      tiles: [
        { img: "keep.png", title: "Keep" },
        { img: "inbox.png", title: "Inbox" },
        { img: "hangouts.png", title: "Hangouts" },
        { img: "messenger.png", title: "Messenger" },
        { img: "google.png", title: "Google+" }
      ],
      creceBichin: "5rem",
      textoDeComentario: "",
      emailDeComentario: "",
      loading: false
    };
  },
  methods: {
    renderTemplate(item) {
      this.$store.commit("changeArticulo", item);
      this.$store.commit("changeKey", item.key);
      this.$router.push({path: "/template", query: {articulo: `${item.key}`}});
      this.cargalapagina();
    },
    guardar(event) {
      this.favourite = !this.favourite;
      if (event == "save") {
        console.log("contenido guardado");
      } else {
        console.log("contenido borrado de favoritos");
      }
    },
    parseContenido() {
      let almanaque = this.$store.getters.biblioteca;
      let counter = 0;
      for (const a in almanaque) {
        if (almanaque.hasOwnProperty(a) && counter < 3) {
          counter++;
          this.contenido[almanaque[a].key] = almanaque[a];
        }
      }
    },
    guardarComentario() {
      if (
        this.emailDeComentario == "" ||
        this.textoDeComentario == "" ||
        this.textoDeComentario.length < 10
      ) {
        alert("Tienes que rellenar ambos campos!");
      } else {
        this.creceBichin = "5rem";
        let nuevoComentario = new Object();
        nuevoComentario["nombre"] = this.emailDeComentario;
        nuevoComentario["texto"] = this.textoDeComentario;
        // Ahora postea el nuevo Comentario;
        this.comentarios[this.emailDeComentario] = nuevoComentario;
        this.emailDeComentario = "";
        this.textoDeComentario = "";
      }
    },
    onScroll: function() {
      let height = this.$refs.infoBox.clientHeight;
      if (window.scrollY <= 450) {
        this.showShare = false;
      } else if (window.scrollY >= 450 && window.scrollY <= 350 + height) {
        this.showShare = true;
      } else {
        this.showShare = false;
      }
    },
    cargalapagina() {
        let data = this.$store.getters.bibliotecaTest;
        let lakey = this.$store.getters.articulo;
        this.articulo = data;
        this.parseContenido();
        window.scrollTo(0, 0);
        this.loading = true;
    }
  },
  mounted() {   
        this.cargalapagina();
  },
  computed: {
    cargado() {
      return store.getters.loaded;
    }
  },
  components: {
    navbar,
    VueScrollProgressBar
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
  margin: 0 6rem;
  font-family: Raleway;
  font-size: 1.4rem;
  display: grid;
}




.sharing {
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-gap: 2rem;
  position: fixed;
  top: 40%;
  left: 7%;
}
.pointer {
  cursor: pointer;
}

.share {
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.share:hover {
  font-size: 2.5rem;
}

.twitter {
  position: absolute;
  top: 120%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.twitter:hover {
  font-size: 2.5rem;
}

.bookmark {
  position: absolute;
  top: 220%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.bookmark:active {
  font-size: 1.3rem;
}

.tituloCard {
  text-align: center;
}

.laCard {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 1rem;
}

.moremore {
  text-align: center;
}


.comentarios {
  padding-bottom: 5rem;
  display: grid;
  margin: 0 15rem;
}

.dejarComentario {
  justify-self: center;
  width: 50vw;
  margin: 0 3rem;
  height: 5rem;
  transition: 300ms ease-in;
  overflow-y: scroll;
  overflow: hidden;
}

.comentarioInside {
  padding: 1.8rem;
}

#textarea {
  width: 100%;
  height: 10rem;
  font-family: Lato;
  font-size: 1.3rem;
}

textarea:focus,
input:focus {
  outline: none;
}

.nombreComentador {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 0.6rem;
}

.botonDeComentario {
  justify-self: center;
}

.inputDelEmail {
  margin: 0 1rem;
  padding: 1rem;
  border-radius: 30px;
  box-shadow: 3px 2px 5px darkgray;
  width: 20rem;
  justify-self: center;
}

.separacionComentarios {
  margin: 3rem 0rem;
  font-family: "Libre Baskerville", serif;
}

.separacionComentarios h3 {
  margin-left: 9rem;
  width: 8rem;
  padding-bottom: 0.7rem;
  border-bottom: 2px solid #f0db4f;
}

.comentariosRecibidosCard {
  margin-bottom: 2rem;
  width: 50vw;
  justify-self: center;
  min-height: 10rem;
}

.comentariosRecibidos {
  padding: 1.5rem;
  display: grid;
}

.fechaComentarios {
  font-size: 0.8rem;
  margin-top: -1rem;
}

.likyliky {
  justify-self: right;
  color: #f0db4f;
}

.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
  
.divContenido >>> .img-fluid{
  max-width: 90vw;
}

@media only screen and (max-width: 1300px) {
  .templateWrapper {
    padding: 5rem 7rem;
    display: grid;
    grid-gap: 3rem;
  }
}

/*-------------- HALF SCREEN ----------------*/
@media only screen and (max-width: 1000px) {
  .templateWrapper {
    padding: 5rem 3rem;
    display: grid;
    grid-gap: 3rem;
  }

  .divContenido {
    margin: 0 1rem;
    font-family: Raleway;
    font-size: 1.3rem;
  }

  .dejarComentario {
    width: 100vw;
    margin: 0 3rem;
    height: 5rem;
  }

  .comentarios {
    padding-bottom: 5rem;
    display: grid;
    margin: 0 2rem;
  }

  .dejarComentario {
    justify-self: center;
    width: 60vw;
    margin: 0 3rem;
    height: 5rem;
    transition: 300ms ease-in;
    overflow-y: scroll;
    overflow: hidden;
  }

  .comentarioInside {
    padding: 1.8rem;
  }

  #textarea {
    width: 100%;
    height: 10rem;
    font-family: Lato;
    font-size: 1.3rem;
  }

  textarea:focus,
  input:focus {
    outline: none;
  }

  .nombreComentador {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-top: 0.6rem;
  }

  .botonDeComentario {
    justify-self: center;
  }

  .inputDelEmail {
    margin: 0 1rem;
    padding: 1rem;
    border-radius: 30px;
    box-shadow: 3px 2px 5px darkgray;
    width: 20rem;
    justify-self: center;
  }

  .separacionComentarios {
    margin: 3rem 0rem;
    font-family: "Libre Baskerville", serif;
  }

  .separacionComentarios h3 {
    margin-top: 1rem;
    width: 8rem;
    margin-left: 7rem;
    padding-bottom: 0.7rem;
    border-bottom: 2px solid #f0db4f;
  }

  .comentariosRecibidosCard {
    width: 60vw;
    justify-self: center;
    min-height: 10rem;
  }

  .sharing {
    display: none;
  }
}

/*-------------- IPHONE 5 ----------------*/
@media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (orientation: portrait) {
  .templateWrapper {
    padding: 5rem 0.2rem;
    display: grid;
    grid-gap: 3rem;
  }

  .imagenFoto {
    height: 20rem;
  }

  .divContenido {
    margin: 0 1.5rem;
    font-family: Raleway;
    font-size: 1.2rem;
  }

  .laCard {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    grid-gap: 1rem;
  }
  .comentarios {
    padding-bottom: 5rem;
    display: grid;
    margin: 0 2rem;
  }

  .dejarComentario {
    justify-self: center;
    width: 80vw;
    margin: 0 0rem;
    height: 5rem;
    transition: 300ms ease-in;
    overflow-y: scroll;
    overflow: hidden;
  }

  .comentariosRecibidosCard {
    margin-bottom: 2rem;
    width: 85vw;
    justify-self: center;
    min-height: 10rem;
  }
}
</style>
