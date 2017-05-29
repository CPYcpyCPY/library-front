import config from './config'
import axios from 'axios'
import tools from './tools'

let prefix = '/api/admin'

let request = (type, url, data) => {
  return $[type]({
    url: url,
    data: data,

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
  createBook(form) {
    let params = tools.postData(prefix + '/createBook', form)
    return axios(prefix + '/createBook', params);
    // return request('post', prefix + '/createBook', form)
  },
  updateBook(form) {
    return request('post', prefix + '/updateBook', form)
  },
  download: prefix + '/file'
}
