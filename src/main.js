import Vue from 'vue'
import App from './App.vue'
// 全局引入字体图标
import './assets/fonts/iconfont.css'
import Button from './components/Button.vue'
import Checkbox from './components/Checkbox.vue'
import CheckboxGroup from './components/CheckboxGroup.vue'
import Dialog from './components/Dialog.vue'
import Input from './components/Input.vue'
import Radio from './components/Radio.vue'
import RadioGroup from './components/RadioGroup.vue'
import Switch from './components/Switch.vue'

// 全局注册组件
Vue.component(Button.name, Button)
Vue.component(Dialog.name, Dialog)
Vue.component(Input.name, Input)
Vue.component(Switch.name, Switch)
Vue.component(Radio.name, Radio)
Vue.component(RadioGroup.name, RadioGroup)
Vue.component(Checkbox.name, Checkbox)
Vue.component(CheckboxGroup.name, CheckboxGroup)

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App)
}).$mount('#app')
