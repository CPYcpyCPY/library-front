import config from './config'
import axios from 'axios'

let prefix = config.url + ':' + config.port + '/api'

export default {
  signIn (number, password) {
    return axios.post(prefix + '/signIn', {
      number: number,
      password: password
    })
  },
  signUp (number, password) {
    return axios.post(prefix + '/signUp', {
      number: number,
      password: password
    })
  },
  books ()  {
    return axios.get(prefix + '/books')
  },
  book (id) {
    return axios.get(prefix + '/book', {
      params: {
        id: id
      }
    })
  },
  download: prefix + '/file'
}
