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
  logout() {
    return request('post', prefix + '/logout', {})
  },
  signIn (number, password) {
    return request('post', prefix + '/signIn', {
      number: number,
      password: password
    })
  },
  users (flag) {
    return request('get', prefix + '/users', {
      flag: flag
    })
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
  deleteBook(number) {
    return request('post', prefix + '/deleteBook', {
      number: number
    })
  },
  addToBlackList(data) {
    return request('post', prefix + '/addToBlackList', {
      number: data.number,
      message: data.message
    })
  },
  removeFromBlackList(number) {
    return request('post', prefix + '/removeFromBlackList', {
      number: number,
    })
  },
  download: prefix + '/file'
}
