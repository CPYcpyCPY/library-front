import config from './config'
import axios from 'axios'

let prefix = config.url + ':' + config.port + '/api'

export default {
  signIn (username, password) {
    return axios.post(prefix + '/signIn', {
      username: username,
      password: password
    })
  },
  signUp (username, password) {
    return axios.post(prefix + '/signUp', {
      username: username,
      password: password
    })
  },
  books ()  {
    return axios.get(prefix + '/books')
  },
  book (id) {
    console.log(id);
    return axios.get(prefix + '/book', {
      params: {
        id: id
      }
    })
  }
}
