import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import Vuetify from 'vuetify'

Vue.use(Vuetify,{
  theme: {
    primary: '#009C8E',
    secondary: '#FFDB6A',
    accent: '#82B1FF',
    error: '#ff4444',
    info: '#FFA658',
    success: '#009C8E',
    warning: '#EA5F40'
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
