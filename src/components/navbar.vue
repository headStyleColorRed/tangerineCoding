<template>
  <div class="everythinghere">
    <div class="navegacionGuapa">
      <div class="tituloNavegacion">
        <h1 style="cursor:pointer" v-on:click="home()">Tangerine Coder</h1>
      </div>
      <div class="hamburguesa">
        <v-icon v-on:click="drawer = !drawer" class="iconoHamburguesa">menu</v-icon>
      </div>
    </div>

    <div class="minidrawer">
      <v-layout wrap>
        <v-navigation-drawer disable-resize-watcher v-model="drawer" fixed>
          <v-list class="pa-1">
            <v-list-tile avatar tag="div">
              <v-list-tile-avatar>
                <img src="../assets/fotos/mifotos.jpg">
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>Rodrigo Labrador</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>

          <v-list class="pt-0" dense>
            <v-divider light></v-divider>

            <v-list-tile v-for="item in items" :key="item.title" @click="enviar(item.title)">
              <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-navigation-drawer>
      </v-layout>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      items: [
        { title: "Tutorials", icon: "chrome_reader_mode" },
        { title: "Help Me!", icon: "compare_arrows" }
      ],
      right: null
    };
  },
  methods: {
    home() {
      this.$router.push("/");
    },
    enviar(event) {
      if (event == "Tutorials") {
        this.$router.push("/tutorials");
      } else if (event == "Help Me!") {
        this.$router.push("/helping");
      }
    }
  }
};
</script>




<style scoped>
.navegacionGuapa {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100vw;
  padding-top: 5rem;
}

.tituloNavegacion {
  margin-left: 8rem;
  font-size: 1.3rem;
  font-family: "Libre Baskerville", serif;
}

.hamburguesa {
  justify-self: right;
  margin-right: 8rem;
}

.iconoHamburguesa {
  font-size: 3rem;
  color: rgb(5, 5, 5);
}

.everythinghere {
  background-color: #f5f5f5;
}



@media only screen and (max-width: 1000px) {
  .tituloNavegacion {
    margin-left: 4rem;
  }

  .hamburguesa {
    justify-self: right;
    margin-right: 4rem;
  }
}


/*-------------- IPHONE 5 ----------------*/
@media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (orientation: portrait) {
  .navegacionGuapa {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100vw;
    padding-top: 5rem;
  }

  .tituloNavegacion {
    margin-left: 2rem;
    font-family: "Libre Baskerville", serif;
  }

  .hamburguesa {
    justify-self: right;
    margin-right: 2rem;
  }

  .iconoHamburguesa {
    font-size: 3rem;
    color: rgb(5, 5, 5);
  }
}

/*-------------- IPHONE 6 ----------------*/
@media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (orientation: portrait) {
  .navegacionGuapa {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100vw;
    padding-top: 5rem;
  }

  .tituloNavegacion {
    margin-left: 1rem;
    font-family: "Libre Baskerville", serif;
  }

  .hamburguesa {
    justify-self: right;
    margin-right: 1rem;
  }

  .iconoHamburguesa {
    font-size: 3rem;
    color: rgb(5, 5, 5);
  }
}

/*---------------- IPAD ----------------*/
@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) {
  .navegacionGuapa {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100vw;
    padding-top: 5rem;
  }

  .tituloNavegacion {
    margin-left: 4rem;
    font-family: "Libre Baskerville", serif;
  }

  .hamburguesa {
    justify-self: right;
    margin-right: 4rem;
  }
}


</style>

font-family: 'Roboto Mono', monospace;
font-family: 'Libre Baskerville', serif;
font-family: 'Playfair Display SC', serif;
