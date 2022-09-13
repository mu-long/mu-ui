import Vue from 'vue'
import MuUI from '../packages/index'
import App from './App.vue'

// 全局注册组件
Vue.use(MuUI)
// 按需导入
// import { Button } from '../packages/index'
// Vue.component(Button.name, Button)

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App)
}).$mount('#app')
