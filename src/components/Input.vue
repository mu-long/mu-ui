<template>
  <div
    class="mu-input"
    :class="{'suffix': showSuffix}"
  >
    <!-- 设置input类型：如果是密码，就控制显示与隐藏 -->
    <input
      class="mu-input__inner"
      :class="{'is-disabled': disabled}"
      :type="showPassword ? (showPwd ? 'text' : 'password') : type"
      :name="name"
      :disabled="disabled"
      :placeholder="placeholder"
      :value="value"
      @input="handleInput"
    >
    <!-- 后缀 -->
    <div
      class="mu-input__suffix"
      v-if="showSuffix"
    >
      <!-- 清除表单 -->
      <i
        class="m-icon-icon-test28"
        v-if="clearable && value"
        @click="clearInput"
      ></i>
      <!-- 显示密码 -->
      <i
        :class="showPwd ? 'm-icon-icon-test2' : 'm-icon-icon-test1'"
        v-if="showPassword && value"
        @click="handlePassword"
      ></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Mu-Input', // 输入框
  props: {
    // 提示占位符
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    name: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ''
    },
    // 可清除的
    clearable: {
      type: Boolean,
      default: false
    },
    // 显示密码
    showPassword: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      // 是否显示密码
      showPwd: false
    }
  },
  computed: {
    // 显示后缀
    showSuffix () {
      return this.clearable || this.showPassword
    }
  },
  methods: {
    handleInput (e) {
      // 触发父组件input事件，设置value
      this.$emit('input', e.target.value)
    },
    // 清除输入框
    clearInput () {
      this.$emit('input', '')
    },
    handlePassword () {
      this.showPwd = !this.showPwd
    }
  }
}
</script>

<style lang="scss" scoped>
.mu-input {
  position: relative;
  margin:0 5px;
  font-size: 14px;
  display: inline-block;
  // display: flex;

  .mu-input__textarea {
    background-color: #fff;
    background-image: none;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    padding: 10px 15px;
    &:focus {
      outline: none;
      border-color: #409eff;
    }
    &.is-disabled {
      background-color: #f5f7fa;
      border-color: #e4e7ed;
      color: #c0c4cc;
      cursor: not-allowed;
    }
  }

  .mu-input__inner {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: none;
    padding: 10px 15px;
    width: 100%;
    &:focus {
      outline: none;
      border-color: #409eff;
    }

    // input禁用样式
    &.is-disabled {
      background-color: #f5f7fa;
      border-color: #e4e7ed;
      color: #c0c4cc;
      cursor: not-allowed;
    }
  }

}

// 有后缀的样式
.mu-input.suffix {
  position: relative;

  .mu-input__inner {
    padding-right: 30px;
  }

  .mu-input__suffix {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #c0c4cc;
    transition: all 0.3s;
    cursor: pointer;
    z-index: 900;

    i{
      transition: all 0.3s;
      &:hover{
        font-size: 18px;
        color: #409eff;
        transition: all 0.3s;
      }
    }
  }
}
</style>
