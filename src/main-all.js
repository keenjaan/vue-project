/**
 * 一次导入所有语言，可以实现语言切换。
 */
import Vue from 'vue'
import App from './App'
import router from './router'
import i18n from './i18n'
import './global.js'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
