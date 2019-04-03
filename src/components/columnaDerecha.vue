<template>
  <div class="supercolumna">
    <div class="mifoto">
      <v-img class="redondearFoto" :src="require(`../assets/fotos/${mifoto}`) " aspect-ratio="1.7"></v-img>
    </div>
    <div class="aboutMe">
      <h2>About Me</h2>
      <p>I'm beginning to feel like a Rap God, Rap God. All my people from the front to the back nod, back nod. Now who thinks their arms are long enough to slap box, slap box?. Let me show you maintaining this shit ain't that hard, that hard. Everybody want the key and the secret. To rap immortality like I have got.</p>
    </div>
    <div class="sigueme">
      <h2>Follow Me</h2>
      <div class="iconos">
        <v-icon class="pointer">fab fa-twitter</v-icon>
        <v-icon class="pointer">fab fa-github</v-icon>
        <v-icon class="pointer">fab fa-instagram</v-icon>
        <v-icon class="pointer">fab fa-facebook</v-icon>
        <v-icon class="pointer">fab fa-youtube</v-icon>
      </div>
    </div>

    <!-- B U S C A N D O   A   N E M O   -->
    <div class="buscador">
      <div class="buscadorWrapper">
        <input v-model="search" class="input1" type="text" placeholder="Search...">
        <v-icon v-on:click="toAlmanaque(search)" class="input2">search</v-icon>
      </div>
      <v-card class="searchedItems">
        <div v-for="(posts, index) in filteredList" :key="index" class="resultados">
          <p v-on:click="search = posts">{{posts}}</p>
        </div>
      </v-card>
    </div>
    <!--   N E M O   E N C O N T R A D O  -->

    <div class="lassTags">
      <h2 class="fontTitle">Tags</h2>
      <div class="chipsChips">
        <v-chip v-for="(chip, index) in chips" :key="index">
          <v-avatar>
            <img :src="require(`../assets/fotos/iconosChips/${chip.foto}`)">
          </v-avatar>
          {{chip.nombre}}
        </v-chip>
      </div>
    </div>
    <div class="ultimasnoticias">
      <h2 class="fontTitle">Latest Posts</h2>
      <h4
        class="titulosdearticulos"
        v-for="(articulo, index) in contenido"
        :key="index"
        v-on:click="renderTemplate(articulo)"
      >{{articulo.titulo}}</h4>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      mifoto: "mifotos.jpg",
      chips: {
        chip1: {
          nombre: "Vue Cli 3",
          foto: "vueChip.jpg"
        },
        chip2: {
          nombre: "HTML 5",
          foto: "html5.png"
        },
        chip3: {
          nombre: "Css 3",
          foto: "css3.png"
        },
        chip4: {
          nombre: "Firebase",
          foto: "firebase.png"
        },
        chip5: {
          nombre: "Node Js",
          foto: "node.png"
        }
      },
      contenido: {},
      search: "",
      palabrasMasBuscadas: [
        "Bitcoin",
        "Litecoin",
        "Ethereum ",
        "Zcash",
        "Dash ",
        "Ripple ",
        "Monero ",
        "Bitcoin Cash",
        "NEO ",
        "EOS ",
        "Theter",
        "Zcash",
        "Python",
        "Ruby",
        "JavaScript",
        "C++",
        "Ruby",
        "Java",
        "TypeScript",
        "TypeScript",
        "C#",
        "PHP",
        "Solidity",
        "Node Js",
        "MongoDb",
        "Vue"
      ]
    };
  },
  mounted() {
    if (this.$store.getters.biblioteca.nada) {
      let paginaHaCargado = setInterval(() => {
        if (store.getters.loaded == false) {
        } else {
          this.retrieveData();
          clearInterval(paginaHaCargado);
        }
      }, 500);
    } else {
      this.retrieveData();
    }
  },
  methods: {
    renderTemplate(item) {
      this.$store.commit("changeArticulo", item);
      this.$store.commit("changeKey", item.key);
      this.$router.push({
        path: "/template",
        query: { articulo: `${item.key}` }
      });
    },
    retrieveData() {
      this.contenido = this.$store.getters.biblioteca;
    },
    toAlmanaque(event){
      if (event.length == 0) {
        return
      } else {
      this.$store.commit("changeSearch", event);
      this.$router.push("/almanaque")
      }
    }
  },
  computed: {
    filteredList() {
      if (this.search == "") {
        return;
      } else {
        return this.palabrasMasBuscadas.filter(result => {
          return result.toLowerCase().includes(this.search.toLowerCase());
        });
      }
    }
  }
};
</script>

<style scoped>
.mifoto {
  display: grid;
}

.redondearFoto {
  border-radius: 50%;
  height: 30vh;
  width: 30vh;
  margin: auto;
}
.fontTitle {
  font-family: "Libre Baskerville", serif;
}

.supercolumna {
  display: grid;
  grid-template-rows: 1fr 1fr 0.5fr 0.5fr 0.5fr 1fr;
  grid-gap: 2rem;
  height: 200vh;
}
.aboutMe {
  font-family: "Libre Baskerville", serif;
}

.aboutMe p {
  font-family: sans-serif;
}

.sigueme h2 {
  font-family: "Libre Baskerville", serif;
}

.iconos {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  margin-top: 1rem;
}

.buscador {
  position: relative;
  display: grid;
}

.buscadorWrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  background-color: #ffffff;
  border-radius: 30px;
  height: 3rem;
}

.searchedItems {
  position: absolute;
  top: 3.2rem;
  left: 20%;
  background-color: white;
  width: 60%;
  text-align: center;
  border-radius: 5px;
  max-height: 11rem;
  overflow: hidden;
  z-index: 9;
}

.resultados p {
  margin-top: 1rem;
}

input:focus {
  outline: none;
}

.input1 {
  padding-left: 1rem;
}

.input2 {
  justify-self: right;
  margin-right: 1rem;
}

.chipsChips {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.ultimasnoticias {
  margin-top: 2rem;
}

.pointer {
  cursor: pointer;
}

.titulosdearticulos {
  cursor: pointer;
  margin-top: 0.5rem;
  font-family: "Playfair Display SC", serif;
}

@media only screen and (max-width: 1000px) {
  .mifoto {
    width: 30vw;
  }

  .iconos {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    margin-top: 1rem;
    width: 30vw;
  }

  .chipsChips {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
  .titulosdearticulos {
    cursor: pointer;
    margin-top: 0.5rem;
    font-family: "Playfair Display SC", serif;
  }
}

/*-------------- IPHONE 5 ----------------*/
@media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (orientation: portrait) {
  .supercolumna {
    margin-top: 5rem;
  }
  .mifoto {
    width: 100%;
  }

  .iconos {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    margin-top: 1rem;
    width: 90vw;
  }

  .chipsChips {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }

  .supercolumna {
    display: grid;
    grid-template-rows: 1fr 1fr 0.5fr 0.3fr 0.5fr 1fr;
    grid-gap: 2rem;
  }
}
/*-------------- IPHONE 6 ----------------*/
@media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (orientation: portrait) {
  .supercolumna {
    margin-top: 5rem;
  }
  .mifoto {
    width: 100%;
  }

  .iconos {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    margin-top: 1rem;
    width: 90vw;
  }

  .chipsChips {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }

  .supercolumna {
    display: grid;
    grid-template-rows: 1fr 1fr 0.5fr 0.5fr 0.5fr 1fr;
    grid-gap: 2rem;
  }
}
/*---------------- IPAD ----------------*/
@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) {
  .supercolumna {
    margin-top: 5rem;
  }
  .mifoto {
    width: 70%;
    margin: auto;
  }

  .iconos {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    margin-top: 1rem;
    width: 90vw;
  }

  .chipsChips {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }

  .supercolumna {
    display: grid;
    grid-template-rows: 1fr 0.3fr 0.3fr 0.3fr 0.5fr 1fr;
    grid-gap: 0rem;
  }
}
</style>

font-family: 'Roboto Mono', monospace;
font-family: 'Libre Baskerville', serif;