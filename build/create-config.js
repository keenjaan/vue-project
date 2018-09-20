const versionConf = require('../config/version.json')
const fs = require('fs')

function createConfig() {}

function autoVersion() {
  if (!versionConf.auto) return
  let version = versionConf.VERSION;
  const arr = version.split('.');
  version = `${arr[0]}.${arr[1]}.${+arr[2]+1}`;
  console.log(version, '---version---')
  versionConf.VERSION = version;
  const str = JSON.stringify(versionConf, null, 2)
  console.log(str, '---str---')
  fs.writeFile('./config/version.json',str,function(err){
    if(err){
        console.error(err);
    } else {
      console.log('---------更新了下一次打包的版本号---------')
    }
  })
}

createConfig.prototype.apply = function(compiler) {
    compiler.plugin('compilation', function(compilation, options) {
        compilation.plugin('html-webpack-plugin-before-html-generation', function(htmlPluginData, callback) {
          const config = {VERSION: versionConf.VERSION}
          autoVersion();
          const reg = /(css|js)\S+?(?=\.)/i;
          config.css = htmlPluginData.assets.css.map((item) => {
            return {name: item.match(reg)[0], hash: item.split('.')[1]}
          })
          config.js = htmlPluginData.assets.js.map((item) => {
            return {name: item.match(reg)[0], hash: item.split('.')[1]}
          })
          compilation.config = config
          // console.log(htmlPluginData, htmlPluginData.assets, 'jslist')
          callback(null, htmlPluginData);
        });
    });
};

module.exports = createConfig;
