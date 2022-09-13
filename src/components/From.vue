<template>
  <div class="mu-from">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Mu-From', // 表单
  // provide 提供 (`Provide / Inject` 跨组件传递)
  provide () {
    return {
      From: this
    }
  },
  props: {
    // 表单对象
    model: {
      type: Object,
      require: true
    },
    // label宽度
    labelWidth: {
      type: String,
      default: '80px'
    }
  }
}
</script>

<style  scoped lang="scss">
.mu-from{
  padding: 10px;
}
</style>
