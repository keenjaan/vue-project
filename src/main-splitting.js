/**
 * 按需导入语言，将语言分成多个包，通过后端设置，或者读取浏览器语言来拉取相应的包。
 */

import Vue from 'vue'
import App from './App'
import router from './router'
import VueI18n from 'vue-i18n'
import './global.js'
import lan from '../config/language.js'

Vue.use(VueI18n)

Vue.config.productionTip = false

function getCookie(name) {
  const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  let arr = document.cookie.match(reg)
  if (arr) {
    return unescape(arr[2])
  } else {
    return null
  }
}

const browserLanguage = (window.navigator.language || window.navigator.browserLanguage).split(
  '-'
)[0]
const index = lan.indexOf(browserLanguage)
// 后写后端会返回语言类型，写入cookie中，此时读取后端配置的语言。没有的话读取浏览器语言，如果浏览器默认语言不再配置的语言列表就用en。
const lang = getCookie('lang') || (index > -1 ? browserLanguage : 'en')

// const lang = 'zh-CN'
/* eslint-disable */

if (lang === "en") {
  require.ensure([], require => {
    const en = require(`./i18n/language/en.json`);
    // console.log(en, 'test')
    const i18n = new VueI18n({
      locale: "en", // 设置语言
      messages: { en: en } // 语言包
    });
    // const i18n = window.i18n
    // console.log(require, 'require');
    /* eslint-disable no-new */
	console.log(router, 'router')
    window.app = new Vue({
      router,
      i18n,
      render: h => h(App)
    }).$mount("#app");
    // }
  });
}

if (lang === "zh-CN") {
  require.ensure([], require => {
    const zhCN = require(`./i18n/language/zh-CN.json`);
    const i18n = new VueI18n({
      locale: "zh-CN", // 设置语言
      messages: { "zh-CN": zhCN } // 语言包
    });
    // const i18n = window.i18n
    // console.log(require, 'require');
    /* eslint-disable no-new */
    new Vue({
      router,
      i18n,
      render: h => h(App)
    }).$mount("#app");
  });
}

if (lang === "id") {
  require.ensure([], require => {
    const id = require(`./i18n/language/id.json`);
    const i18n = new VueI18n({
      locale: "id", // 设置语言
      messages: { id: id } // 语言包
    });
    // const i18n = window.i18n
    // console.log(require, 'require');
    /* eslint-disable no-new */
    new Vue({
      router,
      i18n,
      render: h => h(App)
    }).$mount("#app");
  });
}

