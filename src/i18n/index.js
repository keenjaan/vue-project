/**
 * 一次性导入所有语言
 */
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from './language'

Vue.use(VueI18n)

function getCookie (name) {
  const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  let arr = document.cookie.match(reg)
  if (arr) {
    return unescape(arr[2])
  } else {
    return null
  }
}

const browserLanguage = (window.navigator.language || window.navigator.browserLanguage).split('-')[0]
// 后写后端会返回语言类型，写入cookie中，此时读取后端配置的语言。没有的话读取浏览器语言，如果浏览器默认语言不再配置的语言列表就用en。
const lang = getCookie('lang') || (browserLanguage in messages ? browserLanguage : 'en')

const i18n = new VueI18n({
  locale: lang, // 设置语言
  messages // 语言包
})
export default i18n
