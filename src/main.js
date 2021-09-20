import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
//对$bus事件总线的挂载
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
