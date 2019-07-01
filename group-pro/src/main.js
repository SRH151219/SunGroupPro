import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'

import axios from './common/utils/axios'
Vue.prototype.$axios = axios
Vue.prototype.$observer = new Vue()

// 引入iconfont公共样式
import 'common/myIconfont/iconfont.css'

// 全局引入mint-ui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
// 全局使用mint-ui
Vue.use(MintUI)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')