import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import router from './store/router'
import home from './components/home/home'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.config.productionTip = true

Vue.component('home', home);

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBoMLNSSPRMbaNeCtwK2ZTg5nzYyHUW6uE',
  }
})

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
