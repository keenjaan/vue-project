import Vue from 'vue'
import api from './api'
import { Button } from 'element-ui'
// 按需引入element ui 配置所有的组件引入。
Vue.use(Button)

// 将一些公共库，使用较多的库挂载在vue原型上方便调用。
Vue.prototype.$api = api
