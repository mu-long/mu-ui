<template>
  <div
    class="mu-switch"
    :class="{'is-checked': value}"
  >
    <!-- 开关自定义样式 -->
    <span
      class="mu-switch__core"
      :style="{
        'border-color': value ? checkedColor : uncheckColor,
        'background-color': value ? checkedColor : uncheckColor,
      }"
      @click="handleClick"
      ref="core"
    ></span>
    <!-- 隐藏复选框，用来接收name与切换选中状态 -->
    <input
      class="mu-switch__input"
      type="checkbox"
      :name="name"
      :value="value"
    />
  </div>
</template>

<script>
export default {
  name: 'Mu-Switch',
  props: {
    // 通过input的value，控制是否选中
    value: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: ''
    },
    // 选中颜色
    checkedColor: {
      type: String,
      default: '#409eff'
    },
    // 取消选中颜色
    uncheckColor: {
      type: String,
      default: '#dcdfe6'
    }
  },
  methods: {
    handleClick () {
      this.$emit('input', !this.value)
    }
  }
}
</script>

<style scoped lang="scss">
.mu-switch {
  position: relative;
  display: inline-flex;
  height: 20px;
  line-height: 20px;
  align-items: center;
  font-size: 14px;
  vertical-align: middle;

  // 选中样式
  &.is-checked .mu-switch__core::after {
    left: 100%;
    margin-left: -17px;
  }
  &.is-disabled .mu-switch__core {
    cursor: not-allowed;
  }
  &.is-mimicry .mu-switch__core {
    box-shadow: inset 4px 2px 6px #cacaca48,
      inset -4px -2px 6px rgba(255, 255, 255, 0.247);
  }
  &.is-mimicry .mu-switch__core::after {
    box-shadow: inset 2px 1px 3px #d9d9d9, inset -2px -1px 3px #ffffff;
  }

  .mu-switch__input {
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
    margin: 0;
  }

  .mu-switch__core {
    position: relative;
    cursor: pointer;
    display: inline-block;
    vertical-align: middle;
    margin: 0;
    width: 40px;
    height: 20px;
    border: 1px solid #dcdfe6;
    outline: none;
    border-radius: 10px;
    box-sizing: border-box;
    background: #dcdfe6;
    transition: border-color 0.3s, background-color 0.3s;
  }

  // 小圆
  .mu-switch__core:after {
    content: '';
    position: absolute;
    top: 1px;
    left: 1px;
    width: 16px;
    height: 16px;
    border-radius: 100%;
    background-color: #fff;
    transition: all 0.3s;
  }
}
</style>
