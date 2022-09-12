import Vue from 'vue'
import App from './App.vue'
// 全局引入字体图标
import './assets/fonts/iconfont.css'
import Button from './components/Button.vue'
import Dialog from './components/Dialog.vue'
import Input from './components/Input.vue'

// 全局注册组件
Vue.component(Button.name, Button)
Vue.component(Dialog.name, Dialog)
Vue.component(Input.name, Input)

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App)
}).$mount('#app')
