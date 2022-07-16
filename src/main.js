import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import crono from 'vue-crono'
import vSelect from 'vue-select'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import { IP, PUERTO } from './config/parametros'

if(process.env.NODE_ENV !== 'production'){
  console.log('-------> DESARROLLO <---------')
  console.log(`DIRECCION: ${IP}:${PUERTO}`)
}

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-select/dist/vue-select.css';
import 'cropperjs/dist/cropper.css';


Vue.config.productionTip = false

Vue.use(vSelect)
Vue.component("v-select", vSelect);

Vue.use(crono)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
