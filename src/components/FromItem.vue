<template>
  <div class="mu-from-item">
    <label
      class="mu-form-item__label"
      :style="labelStyle"
    >{{ label }}</label>
    <div class="mu-form-item__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Mu-FromItem', // 表单选项
  // inject 注入
  inject: {
    From: {
      default: ''
    }
  },
  props: {
    label: {
      type: String,
      default: ''
    }
  },
  computed: {
    labelStyle () {
      return {
        width: this.From.labelWidth,
        textAlign: 'center'
      }
    }
  }
}
</script>

<style scoped lang="scss">
.mu-from-item{
  display: flex;
  justify-content: start;
  align-items: center;
  margin-bottom: 22px;
  text-align: center;

  .mu-form-item__label {
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    box-sizing: border-box;
  }

  .mu-form-item__content {
    line-height: 40px;
    position: relative;
    font-size: 14px;
    &::before,
    &::after {
      display: table;
      content: '';
    }
  }
}

</style>
