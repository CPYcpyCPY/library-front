import axios from 'axios'
axios.defaults.withCredentials = true

let prefix = '/api'

let request = (type, url, data) => {
  return $[type]({
    url: url,
    data: data,
    xhrFields: {
        withCredentials: true
      }
  })
}

export default {
  state: {
    user: ''
  },
  mutations: {
    SET_USER (state, user) {
      state.user = user
    }
  },
  actions: {
    GET_USER ({commit}, data) {
      return request('get', prefix + '/isLogin', {}).then((res) => {
        if(res.msg) commit('SET_USER', res.user);
        else commit('SET_USER', null);
      })
    }
  }
}