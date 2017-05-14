import config from './config'
import axios from 'axios'

let prefix = config.url + ':' + config.port + '/api/admin'

export default {
  isLogin () {
    return axios.get(prefix + '/isLogin');
  },
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
  download: prefix + '/file'
}
