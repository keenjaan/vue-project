const fs = require('fs') // 引入文件系统模块
const path = require('path') // 引入path模块
// const {productList} = require('./data.js')
const getJsonFile = require('../util.js')
const productList = require('../data.js').productList

module.exports = {
  createJson: function (option) {
    if (option) {
      productList.push(option)
    } else {
      productList.push(getJsonFile('./product.json'))
    }
    return {code: 200, isSuccess: true}
  },
  getJson: function () {
    return json.parse(productList)
  },
  removeJson: function (id) {
    productList.forEach((item, index) => {
      if (item.id === id) {
        productList.splice(index, 1);
      }
    })
    return {code: 200, isSuccess: true}
  },
  update: function (id, option) {
    productList.forEach((item, index) => {
      if (item.id === id) {
        productList[index] = option;
      }
    })
    return {code: 200, isSuccess: true}
  }
}
