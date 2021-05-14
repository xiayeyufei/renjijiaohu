import Vue from 'vue'
import App from './App.vue'
import index from './index'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import './plugins/element.js'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(index)
}).$mount('#app')
