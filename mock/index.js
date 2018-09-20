const Mock = require('mockjs')// mockjs 导入依赖模块
const util = require('./util')// 自定义工具模块
const api = require('../src/api/url.js')
const product = require('./product')
const order = require('./order')
// 返回一个函数
module.exports = function (app) {
  // 监听http请求
  app.get(api.login.url, function (req, res) {
    // 将json传入 Mock.mock 方法中，生成的数据返回给浏览器
    res.json(Mock.mock(product.createJson))
  })

  // 监听http请求
  app.get(api.login.url, function (req, res) {
    // 每次响应请求时读取mock data的json文件
    // 将json传入 Mock.mock 方法中，生成的数据返回给浏览器
    res.json(Mock.mock(order.createJson))
  })
}
