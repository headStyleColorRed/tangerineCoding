import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import Vuetify from 'vuetify'
import VueScrollProgressBar from 'vue-scroll-progressbar'
import Vueditor from 'vueditor'
import { config } from "./editor"
import vuescroll from 'vue-scroll'
import axios from "axios"

Vue.use(vuescroll);
Vue.use(Vueditor, config);
Vue.use(VueScrollProgressBar)


Vue.use(Vuetify, {})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  mounted() {
    axios
    .get(`https://tangerine-coder.firebaseio.com/articulos.json`)
    .then(result => {
      let biblioteca = new Object();

      for (const a in result.data) {
        if (result.data.hasOwnProperty(a)) {
          for (const b in result.data[a]) {
            if (result.data[a].hasOwnProperty(b)) {
              biblioteca[a] = result.data[a][b];
            }
          }
        }
      }
      store.commit("changeBiblioteca", biblioteca);
      store.commit("changeLoaded", true);
    })
    .catch(err => {
      console.log(err);
    });
  },
}).$mount('#app')
