const fs = require('fs') // 引入文件系统模块
const path = require('path') // 引入path模块
// const {productList} = require('./data.js')
const getJsonFile = require('../util.js')
const orderList = require('../data.js').orderList

module.exports = {
  createJson: function (option) {
    if (option) {
      orderList.push(option)
    } else {
      orderList.push(getJsonFile('./order.json'))
    }
    return {code: 200, isSuccess: true}
  },
  getJson: function () {
    return json.parse(orderList)
  },
  removeJson: function (id) {
    orderList.forEach((item, index) => {
      if (item.id === id) {
        orderList.splice(index, 1);
      }
    })
    return {code: 200, isSuccess: true}
  },
  update: function (id, option) {
    orderList.forEach((item, index) => {
      if (item.id === id) {
        orderList[index] = option;
      }
    })
    return {code: 200, isSuccess: true}
  }
}
