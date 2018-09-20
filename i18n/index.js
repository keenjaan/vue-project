const fs = require('fs')
const path = require('path')
const CSVParser = require('./helpers/CSVParser')
const DataGridRenderer = require('./helpers/DataGridRenderer')
const lan = require('../config/language.js')
// console.log(lan, 'lan')

function getParsedText (text) {
  let { dataGrid, headerNames, headerTypes } = CSVParser.parse(
    text,
    undefined,
    'auto',
    false,
    false
  )

  return DataGridRenderer['jsonArrayRows'](
    dataGrid,
    headerNames,
    headerTypes,
    '  ',
    '\n'
  )
}
// 删除上一次的语言文件
function removeFile () {
  var folderExists = fs.existsSync('./src/i18n/language')
  if (folderExists === true) {
    var dirList = fs.readdirSync('./src/i18n/language')
    dirList.forEach(function (fileName) {
      fs.unlinkSync('./src/i18n/language/' + fileName)
    })
  }
}
// 横杠转驼峰法
function toCamel (str) {
  const re = /-(\w)/g
  return str.replace(re, function ($0, $1) {
    return $1.toUpperCase()
  })
}

removeFile()

const txt = fs.readFileSync(path.resolve(__dirname, './language.txt'), {
  encoding: 'utf8'
}).replace(/\\/g, '').replace(/"/g, '”')
/* eslint-disable-next-line */
const arr = eval(getParsedText(txt))

// 语言翻译的先后顺序
// const lan = ['zh-CN', 'id', 'en']

const language = {}
const CN_INDEX = lan.indexOf('zh-CN')
lan.forEach(i => {
  language[i] = {}
})
arr.forEach(item => {
  if (item[CN_INDEX].trim()) {
    item.forEach((l, index) => {
      language[lan[index]][item[CN_INDEX]] = l
    })
  }
})

Object.keys(language).forEach(key => {
  fs.writeFile(
    `./src/i18n/language/${key}.json`,
    JSON.stringify(language[key]),
    'utf8',
    e => {
      if (e) {
        console.error(e.message)
      } else {
        console.log(`${key}语言包输出文件完成`)
      }
    }
  )
})
let importStr = ''
let lanStr = ''
lan.forEach(ln => {
  importStr += `import ${toCamel(ln)} from './${ln}'\n`
  lanStr += `"${ln}": ${toCamel(ln)},`
})

fs.writeFile(
  `./src/i18n/language/index.js`,
  `/* eslint-disable */  \n${importStr}\nconst messages = {${lanStr}}\nexport default messages`,
  'utf8',
  e => {
    if (e) {
      console.error(e.message)
    } else {
      console.log(`语言配置文件输出完成`)
    }
  }
)
