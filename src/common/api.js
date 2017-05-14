import config from './config'
import axios from 'axios'
require('./DataTable/jquery-3.2.1.min.js')
axios.defaults.withCredentials = true

let prefix = config.url + ':' + config.port + '/api'

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
  signIn (number, password) {
    return request('post', prefix + '/signIn', {
      number: number,
      password: password
    })
  },
  logout (number) {
    return request('post', prefix + '/logout', {
      number: number
    })
  },
  signUp (number, password) {
    return request('post', prefix + '/signUp', {
      number: number,
      password: password
    })
  },
  books (flag)  {
    return request('get', prefix + '/books', {
      flag: flag
    })
  },
  book (number) {
    return request('get', prefix + '/book', {
      number: number
    })
  },
  getUser (number) {
    return request('get', prefix + '/user', {
      number: number
    })
  },
  reserve (userNumber, bookNumber) {
    return request('get', prefix + '/book-reserve', {
      userNumber: userNumber,
        bookNumber: bookNumber
    })
  },
  download: prefix + '/file'
}
