<template>
  <div id="app">
    <h1>Mu-ui</h1>
    <div class="button">
      <h2>按钮</h2>
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
  </div>
</template>

<script>
export default {
  name: 'Mu-ui',
  methods: {
    sayHello () {
      alert('hello')
    }
  }
}
</script>

<style lang="scss"></style>
