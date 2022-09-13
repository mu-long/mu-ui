/**
 * 整个包的入口
 */

// 全局引入字体图标
import '../src/assets/fonts/iconfont.css'
// 引入组件
import Button from '../src/components/Button.vue'
import Checkbox from '../src/components/Checkbox.vue'
import CheckboxGroup from '../src/components/CheckboxGroup.vue'
import Dialog from '../src/components/Dialog.vue'
import From from '../src/components/From.vue'
import FromItem from '../src/components/FromItem.vue'
import Input from '../src/components/Input.vue'
import Radio from '../src/components/Radio.vue'
import RadioGroup from '../src/components/RadioGroup.vue'
import Switch from '../src/components/Switch.vue'

// 组件列表
const components = [
  Button,
  Checkbox,
  CheckboxGroup,
  Dialog,
  From,
  FromItem,
  Input,
  Radio,
  RadioGroup,
  Switch
]

const install = function (Vue) {
  // 全局注册所有组件
  components.forEach(item => {
    Vue.component(item.name, item)
  })
}

// 判断是否是直接引入文件。如果是，就不用调用 Vue.use()
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export {
  Button,
  Checkbox,
  CheckboxGroup,
  Dialog,
  From,
  FromItem,
  Input,
  Radio,
  RadioGroup,
  Switch
}

export default {
  install
}
