# mu-ui-vue2

## 建立项目
```sh
npm install
```

### 编译和开发热加载
```sh
npm run serve
```

### 针对生产环境进行编译
```sh
npm run build
```

### 检查和修复文件
```sh
npm run lint
```

### 打包为库
```sh
npm run lib
```

## 简介

- 基于vue2.x的 Vue UI 组件库

## 使用

1. 安装

```sh
npm i npm i mu-ui-vue2
```

2. 导入样式

```js
import 'mu-ui-vue2/dist/mu-ui-vue2.css'
```

3. 全局注册

```js
// src/main.js
// import MuUI from '../packages/index'
import MuUI from 'mu-ui-vue2'

// 全局注册组件
Vue.use(MuUI)
```

3. 按需导入

```js
// src/main.js
// 按需导入
// import { Button } from '../packages/index'
import { Button } from 'mu-ui-vue2'
Vue.component(Button.name, Button)
```


## 字体图标
- 导入 font-awesome 字体图标

```js
// 全局引入字体图标
import './assets/fonts/iconfont.css'
```

- 预览图标
  - `src\assets\fonts\demo_index.html`
  - 查看`font-class`选项

### 开发者字体配置
- 定制私有前缀
  - 打开阿里图标
  - 修改项目设置
    - mu-ui-vue2：前缀m-icon-；默认字体mui-iconfont；
  - 下载到本地，修改`src\assets\fonts\iconfont.css`
```css
/* .mui-iconfont 默认 */
/* 修改为属性选择器 class类名包含 m-icon- 的就应用这个字体  */
[class*='m-icon-'] {
  font-family: "mui-iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

---

## 组件

### 按钮(Button)

#### 参数

| 属性     | 值               | 描述                                                                 |
| -------- | ---------------- | -------------------------------------------------------------------- |
| type     | String           | 按钮类型：primary,info,success,warning,danger                        |
| plain    | Boolean          | 是否为朴素按钮，默认为 false                                         |
| mimicry  | Boolean          | 是否为拟态按钮，和 plain 不能同时设置，会被 plain 覆盖。默认为 false |
| disabled | Boolean          | 是否禁用按钮，默认为 false                                           |
| round    | Boolean          | 是否为圆角按钮，默认为 false                                         |
| circle   | Boolean          | 是否为圆形按钮，默认为 false                                         |
| icon     | Array 或 Boolean | font-awesome 字体数组，默认为 false                                  |

#### 事件

| 事件  | 值       | 描述     |
| ----- | -------- | -------- |
| click | Function | 点击事件 |



---

### 对话框(Dialog)

| 属性     | 值      | 描述                               |
| -------- | ------- | ---------------------------------- |
| title    | String  | 对话框头部提示，默认为"提示"       |
| hasFoolt | Boolean | 底部按钮可见状态，默认为 true       |
| isShow   | Boolean | 对话框可见状态，默认为 false       |
| width    | String  | 对话框宽度，默认为 50%             |
| top      | String  | 对话框距离顶部位置，默认为 15vh    |


| 插槽   | 描述                    |
| ------ | ----------------------- |
| title  | Dialog 标题区的内容     |
| body  | Dialog 内容区的内容     |
| footer | Dialog 按钮操作区的内容 |

---

### 输入框(Input)

| 属性         | 值      | 描述                               |
| ------------ | ------- | ---------------------------------- |
| type         | ['text', 'password', 'textarea']  | 表单类型，默认为'text' |
| name         | String  | 表单命名，默认为空                 |
| value        | String  | 表单值，默认为空字符串             |
| width        | String  | 输入框宽度，默认为180px             |
| rows        | Number  | 文本域高度，默认为2             |
| placeholder  | String  | 占位符，默认为空字符串             |
| disabled     | Boolean | 是否禁用，默认为 false             |
| clearable    | Boolean | 是否可清空，默认为 false           |
| showPassword | Boolean | 是否显示密码可见，默认为 false     |

#### 复合型输入框
- 通过具名插槽，可使用复合型输入框
```vue
<Mu-Input
  type='text'
  name='domainName'
  placeholder='请输入域名'
  v-model="domainName"
>
  <!-- 前缀 -->
  <template slot="prepend">Http://</template>
  <!-- 后缀 -->
  <template slot="append">.com</template>
</Mu-Input>
```

### 计算器(InputNumber)

| 属性      | 值               | 描述                              |
| --------- | ---------------- | --------------------------------- |
| name      | String           | 表单命名，默认为空                |
| value     | [Number, String] | 表单值，默认为空字符串            |
| step      | Number           | 步长，每次变化数值，默认为1       |
| min       | Number           | 最小值，默认为 -Infinity 负无穷大 |
| max       | Number           | 最大值，默认为 +Infinity 正无穷大 |
| precision | [Number, String] | 小数点精度，默认为0整数           |
| disabled  | Boolean          | 是否禁用，默认为 false            |

### 切换(Switch)

| 属性          | 值      | 描述                               |
| ------------- | ------- | ---------------------------------- |
| name          | String  | 表单命名，默认为空                 |
| value         | String  | 表单值，默认为空字符串             |
| checkedColor   | String  | 选中状态颜色，默认为 #409eff        |
| uncheckColor | String  | 未选中状态颜色，默认为 #dcdfe6      |



| 事件   | 值       | 描述                               |
| ------ | -------- | ---------------------------------- |
| change | Function | 状态修改触发事件，返回修改后的状态 |

---

### 单选框(Radio)

| 属性    | 值                        | 描述                               |
| ------- | ------------------------- | ---------------------------------- |
| label   | [String, Number, Boolean] | 单选框 label 值，默认为空字符串    |
| name    | String                    | 表单命名，默认为空                 |
| value   | String                    | 表单值，默认为空字符串             |
| color   | String                    | 单选框选择时的颜色，默认为#409eff  |

### 单选框组(RadioGroup)

用于包裹 radio，通过 v-model 指定组内所有的 radio 的 v-model

---

### 复选框(Checkbox)

| 属性    | 值                        | 描述                               |
| ------- | ------------------------- | ---------------------------------- |
| label   | [String, Number, Boolean] | 复选框 label 值，默认为空字符串    |
| name    | String                    | 表单命名，默认为空                 |
| value   | Boolean                   | 表单选中状态，默认为false          |
| color   | String                    | 复选框选择时的颜色，默认为#409eff  |

### 复选框组(CheckboxGroup)

| 属性    | 值                        | 描述                               |
| ------- | ------------------------- | ---------------------------------- |
| label   | String                    | 复选框 label 值，默认为空字符串    |
| name    | String                    | 表单命名，默认为空                 |
| value   | Boolean                   | 表单选中状态，默认为false          |
| color   | String                    | 复选框选择时的颜色，默认为#409eff  |

用于包裹多个 checkbox，通过 v-model 指定组内所有的 checkout 的 v-model

---
### 表单(Form)

| 属性        | 值     | 描述                 |
| ----------- | ------ | -------------------- |
| model       | Object | 表单对象，必填       |
| label-width | String | 标签宽度，默认"80px" |

---

### 表单项(Form-item)

| 属性  | 值     | 描述                            |
| ----- | ------ | ------------------------------- |
| label | String | 单选框 label 值，默认为空字符串 |

