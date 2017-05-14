import config from './config'
import axios from 'axios'

let prefix = config.url + ':' + config.port + '/api/admin'

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
  isLogin () {
    return request('get', prefix + '/isLogin', {})
  },
  logout(number) {
    return request('post', prefix + '/logout', {})
  },
  signIn (number, password) {
    return request('post', prefix + '/signIn', {
      number: number,
      password: password
    })
  },
  users () {
    return request('get', prefix + '/users', {})
  },
  deleteUser(number) {
    return request('get', prefix + '/deleteUser', {
      number: number
    })
  },
  download: prefix + '/file'
}
