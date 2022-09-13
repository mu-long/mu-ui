<template>
  <div id="app">
    <h1>Mu-ui</h1>
    <div class="button">
      <h2>Button 按钮</h2>
      <div class="row">
        <h3>普通按钮</h3>
        <Mu-Button type='normal'>normal 普通</Mu-Button>
        <Mu-Button type='primary'>primary 主要</Mu-Button>
        <Mu-Button type='success'>success 成功</Mu-Button>
        <Mu-Button type='danger'>danger 危险</Mu-Button>
        <Mu-Button type='warning'>warning 警告</Mu-Button>
        <Mu-Button type='info'>info 信息</Mu-Button>
      </div>

      <div class="row">
        <h3>朴素按钮 plain</h3>
        <Mu-Button
          plain
          type='normal'
        >normal 普通</Mu-Button>
        <Mu-Button
          plain
          type='primary'
        >primary 主要</Mu-Button>
        <Mu-Button
          plain
          type='success'
        >success 成功</Mu-Button>
        <Mu-Button
          plain
          type='danger'
        >danger 危险</Mu-Button>
        <Mu-Button
          plain
          type='warning'
        >warning 警告</Mu-Button>
        <Mu-Button
          plain
          type='info'
        >info 信息</Mu-Button>
      </div>

      <div class="row">
        <h3>拟态按钮</h3>
        <Mu-Button
          mimicry
          type='normal'
        >normal 普通</Mu-Button>
        <Mu-Button
          mimicry
          type='primary'
        >primary 主要</Mu-Button>
        <Mu-Button
          mimicry
          type='success'
        >success 成功</Mu-Button>
        <Mu-Button
          mimicry
          type='danger'
        >danger 危险</Mu-Button>
        <Mu-Button
          mimicry
          type='warning'
        >warning 警告</Mu-Button>
        <Mu-Button
          mimicry
          type='info'
        >info 信息</Mu-Button>
      </div>

      <div class="row">
        <h3>圆角按钮 round</h3>
        <Mu-Button
          round
          type='normal'
        >normal 普通</Mu-Button>
        <Mu-Button
          round
          type='primary'
        >primary 主要</Mu-Button>
        <Mu-Button
          round
          type='success'
        >success 成功</Mu-Button>
        <Mu-Button
          round
          type='danger'
        >danger 危险</Mu-Button>
        <Mu-Button
          round
          type='warning'
        >warning 警告</Mu-Button>
        <Mu-Button
          round
          type='info'
        >info 信息</Mu-Button>
      </div>

      <div class="row">
        <h3>圆形按钮 circle</h3>
        <Mu-Button
          circle
          type='normal'
        >圆</Mu-Button>
        <Mu-Button
          circle
          type='primary'
        >圆</Mu-Button>
        <Mu-Button
          circle
          type='success'
        >圆</Mu-Button>
        <Mu-Button
          circle
          type='danger'
        >圆</Mu-Button>
        <Mu-Button
          circle
          type='warning'
        >圆</Mu-Button>
        <Mu-Button
          circle
          type='info'
        >圆</Mu-Button>
      </div>

      <div class="row">
        <h3>带字体图标 按钮 m-icon</h3>
        <Mu-Button
          circle
          type='normal'
          icon='m-icon-icon-test7'
        ></Mu-Button>
        <Mu-Button
          circle
          type='primary'
          icon='m-icon-icon-test8'
        ></Mu-Button>
        <Mu-Button
          circle
          type='success'
          icon='m-icon-icon-test51'
        ></Mu-Button>
        <Mu-Button
          circle
          type='danger'
          icon='m-icon-icon-test21'
        ></Mu-Button>
        <Mu-Button
          circle
          type='warning'
          icon='m-icon-icon-test40'
        ></Mu-Button>
        <Mu-Button
          circle
          type='info'
          icon='m-icon-icon-test33'
        ></Mu-Button>
        <Mu-Button
          round
          type='warning'
          icon='m-icon-icon-test40'
        >收藏</Mu-Button>
      </div>

      <div class="row">
        <h3>点击事件 click</h3>
        <Mu-Button
          type='primary'
          @click="sayHello"
        >点击事件</Mu-Button>
      </div>

      <div class="row">
        <h3>禁用按钮 disabled</h3>
        <Mu-Button
          type='primary'
          disabled
          @click="sayHello"
        >禁用按钮</Mu-Button>
      </div>
    </div>

    <div class="dialog">
      <h2>对话框 Dialog</h2>
      <Mu-Button
        type='primary'
        @click="isShow = true"
      >显示 Dialog 对话框</Mu-Button>
      <!-- <Mu-Dialog title="温馨提示"></Mu-Dialog> -->

      <!-- <Mu-Dialog :isShow='isShow' @update:isShow='isShow = false'> -->
      <!-- .sync语法糖 相当于上面的简写形式 -->
      <Mu-Dialog
        width='60%'
        top='20vh'
        :isShow.sync='isShow'
      >
        <template v-slot:title>
          <!-- <h2>温馨提示：</h2> -->
          <span>温馨提示：</span>
        </template>

        <template v-slot:body>
          <span>这是一段信息...</span>
        </template>

        <template v-slot:footer>
          <Mu-Button
            type='danger'
            @click="isShow = false"
          >取消</Mu-Button>
          <Mu-Button
            type='primary'
            @click="isShow = false"
          >确定</Mu-Button>
        </template>
      </Mu-Dialog>
    </div>

    <div class="input">
      <h2>输入框 Input</h2>
      <h3>普通输入框</h3>
      <Mu-Input
        name='username'
        placeholder='请输入用户名'
        clearable
        v-model="username"
      ></Mu-Input>
      <h3>密码输入框</h3>
      <Mu-Input
        name='password'
        type='password'
        placeholder='请输入密码'
        showPassword
        v-model="password"
      ></Mu-Input>
      <h3>禁用输入框</h3>
      <Mu-Input
        name='createTime'
        disabled
        value='2022-09-11'
      ></Mu-Input>
      <!-- <input type="text" name="email" v-model="email"> -->
      <!-- v-model指令是一个语法糖，等价于下面 -->
      <!-- <input type="text" name="email" :value="email" @input="email = $event.target.value"> -->
    </div>

    <div class="switch">
      <h2>开关 Switch</h2>
      默认开关：<Mu-Switch
        name="test"
        v-model="switchActive"
      ></Mu-Switch>
      <br>
      记住密码：<Mu-Switch
        name="remember"
        v-model="switchActive2"
        checkedColor='#67c23a'
        uncheckColor='#f56c6c'
      ></Mu-Switch>
    </div>

    <div class="radio">
      <h2>单选 Radio</h2>
      性别：<Mu-Radio
        name="man"
        label="1"
        color="hotpink"
        v-model="gender"
      >男</Mu-Radio>
      <Mu-Radio
        name="woman"
        label="0"
        color="hotpink"
        v-model="gender"
      >女</Mu-Radio>
    </div>

    <div class="radioGroup">
      <h2>单选组 RadioGroup</h2>
      是否追星：<Mu-RadioGroup v-model="star">
        <Mu-Radio
          name="star1"
          label="1"
          color="hotpink"
        >是</Mu-Radio>
        <Mu-Radio
          name="star0"
          label="0"
          color="hotpink"
        >否</Mu-Radio>
      </Mu-RadioGroup>
    </div>

    <div class="checkbox">
      <h2>复选框 Checkbox</h2>
      记住我：<Mu-Checkbox
        name="remember"
        color="hotpink"
        label="ok"
        v-model="remember"
      >确定</Mu-Checkbox>
    </div>

    <div class="checkboxGroup">
      <h2>复选框组 CheckboxGroup</h2>
      <Mu-CheckboxGroup v-model="hobby">
        爱好：<Mu-Checkbox
          name="movie"
          label="看电影"
        ></Mu-Checkbox>
        <Mu-Checkbox
          name="food"
          label="美食"
        ></Mu-Checkbox>
        <Mu-Checkbox
          name="game"
          label="打游戏"
        ></Mu-Checkbox>
        <Mu-Checkbox
          name="walk"
          label="散步"
        ></Mu-Checkbox>
      </Mu-CheckboxGroup>
      选中的爱好：{{ hobby }}
    </div>

    <div class="form">
      <h2>From 组件</h2>
      <Mu-From
        :model="from"
        labelWidth="100px"
      >
        <Mu-FromItem label="用户名：">
          <Mu-Input
            name='username'
            placeholder='请输入用户名'
            clearable
            v-model="from.username"
          ></Mu-Input>
        </Mu-FromItem>

        <Mu-FromItem label="密码：">
          <Mu-Input
            name='password'
            type='password'
            placeholder='请输入密码'
            showPassword
            v-model="from.password"
          ></Mu-Input>
        </Mu-FromItem>
        <Mu-FromItem label="性别：">
          <Mu-Radio
            name="man"
            label="1"
            color="hotpink"
            v-model="from.gender"
          >男</Mu-Radio>
          <Mu-Radio
            name="woman"
            label="0"
            color="hotpink"
            v-model="from.gender"
          >女</Mu-Radio>
        </Mu-FromItem>
        <Mu-FromItem label="爱好：">
          <Mu-CheckboxGroup v-model="from.hobby">
            <Mu-Checkbox
              name="movie"
              label="看电影"
            ></Mu-Checkbox>
            <Mu-Checkbox
              name="food"
              label="美食"
            ></Mu-Checkbox>
            <Mu-Checkbox
              name="game"
              label="打游戏"
            ></Mu-Checkbox>
            <Mu-Checkbox
              name="walk"
              label="散步"
            ></Mu-Checkbox>
          </Mu-CheckboxGroup>
        </Mu-FromItem>
        <Mu-FromItem label="记住密码：">
          <Mu-Switch
            name="remember"
            v-model="from.remember"
            checkedColor='#67c23a'
            uncheckColor='#f56c6c'
          ></Mu-Switch>
        </Mu-FromItem>
        <Mu-FromItem>
          <Mu-Button type='danger'>取消</Mu-Button>
          <Mu-Button type='primary'>确定</Mu-Button>
        </Mu-FromItem>
        <!-- <Mu-FromItem></Mu-FromItem>
        <Mu-FromItem></Mu-FromItem> -->

      </Mu-From>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Mu-ui',
  data () {
    return {
      isShow: false,
      username: '', // 用户名
      password: '', // 密码
      switchActive: false,
      switchActive2: false,
      gender: '1', // 性别
      star: 0, // 是否追星
      remember: false, // 记住我
      hobby: ['美食'], // 爱好
      from: {
        username: '', // 用户名
        password: '', // 密码
        gender: '1', // 性别
        remember: false, // 记住密码
        hobby: [] // 爱好
      }
    }
  },
  methods: {
    sayHello () {
      alert('hello')
    }
  }
}
</script>

<style lang="scss"></style>
