// 自定义指令
import directives from '@/directives'
import Vue from 'vue'
import MuUI from '../packages/index'
import App from './App.vue'

// 全局注册组件
Vue.use(MuUI)
// 按需导入
// import { Button } from '../packages/index'
// Vue.component(Button.name, Button)

// 批量注册自定义指令
Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key])
})

Vue.config.productionTip = false

const vue = new Vue({
  render: h => h(App)
}).$mount('#app')

// 可以把vue实例绑定到上，方便调用自定义组件
window.vue = vue

export default Vue
