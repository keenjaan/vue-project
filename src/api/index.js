import network from './network.js'
// import apiUrl from './url.js'
const apiUrl = require('./url.js')
import valid from './validate'

// const SERVER_URL = 'https://api.douban.com/v2'
const SERVER_URL = '/api'
const api = {}
api.login = (option) => {
  return new Promise((resolve, reject) => {
    network.post(`SERVER_URL${apiUrl.login.url}`, option).then((data) => {
      // 返回字段验证
      valid(apiUrl.getBook.model, data)
      resolve(data.data)
    }, (err) => {
      console.log('接口返回错误');
      reject(err)
    });
  });
}

api.getBook = () => {
  return new Promise((resolve, reject) => {
    network.get(`${SERVER_URL}${apiUrl.getBook.url}`).then((data) => {
      // 返回字段验证
      valid(apiUrl.getBook.model, data)
      resolve(data.data)
    }, (err) => {
      console.log('接口返回错误');
      reject(err)
    });
  });
}

export default api
