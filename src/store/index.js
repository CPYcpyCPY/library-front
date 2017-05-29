import Vue from 'Vue'
import Vuex from 'Vuex'

Vue.use(Vuex)

import user from './modules/user'

export default new Vuex.Store({
  modules: {
    user:user
  }
})