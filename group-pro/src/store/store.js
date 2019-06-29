import Vue from 'vue'
import Vuex from 'vuex'
import my from './my/index'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    my
  }
})