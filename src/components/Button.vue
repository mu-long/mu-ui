<template>
  <button
    class="mu-button"
    :class="[
      `mu-button--${type}`,
      {
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle,
        'is-disabled': disabled
      }
    ]"
    :disabled='disabled'
    @click="handleClick"
  >
    <!-- <i class="mui-iconfont m-icon-guanbi1"></i> -->
    <i
      :class="icon"
      v-if="icon"
    ></i>
    <!-- 根据是否传入内容进行span渲染 -->
    <span v-if="$slots.default">
      <slot></slot>
    </span>
  </button>
</template>

<script>
export default {
  name: 'Mu-Button', // 按钮
  props: {
    // 类型
    type: {
      type: String,
      default: 'normal',
      // 数据效验
      validator: value => {
        // normal 普通; primary 主要; success 成功; danger 危险; warning 警告; info 信息
        return ['normal', 'primary', 'success', 'danger', 'warning', 'info'].includes(value)
      }
    },
    // 朴素按钮
    plain: {
      type: Boolean,
      default: false
    },
    // 圆角按钮
    round: {
      type: Boolean,
      default: false
    },
    // 圆形按钮
    circle: {
      type: Boolean,
      default: false
    },
    // 禁用按钮
    disabled: {
      type: Boolean,
      default: false
    },
    // 字体图标
    icon: {
      type: String,
      default: ''
    }
  },

  created () {
    // 获取所有的插槽
    // console.log('$slots', this.$slots)
  },

  methods: {
    handleClick (e) {
      // if (this.disabled) return
      this.$emit('click', e)
    }
  }
}
</script>

<style lang="scss" scoped>
$normal-color: #fff;
$normal-active-color: #409eff;
$primary-color: #409eff;
$primary-active-color: #66b1ff;
$info-color: #909399;
$info-active-color: #a6a9ad;
$success-color: #67c23a;
$success-active-color: #85ce61;
$warning-color: #e6a23c;
$warning-active-color: #ebb563;
$danger-color: #f56c6c;
$danger-active-color: #f78989;

.mu-button {
  position: relative;
  cursor: pointer;
  display: inline-block;
  box-sizing: border-box;
  margin: 0 5px;
  padding: 12px 20px;
  background-color: $normal-color;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  white-space: nowrap;
  outline: none;
  font-family: 'PingFang SC', 'Microsoft Yahei', sans-serif;
  line-height: 1;
  font-size: 14px;
  color: #606266;
  font-weight: 500;
  // 禁止文字被选中
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  transition: 0.1s;
  &:hover,
  &:focus {
    color: $normal-active-color;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
  }
}

.mu-button--primary {
  color: #fff;
  background-color: $primary-color;
  border-color: $primary-color;
  // box-shadow: inset 3px 6px 10px #337ecc, inset -3px -7px 10px #4dbeff;
  &:hover,
  &:focus {
    background: $normal-active-color;
    background-color: $normal-active-color;
    color: #fff;
  }
}

.mu-button--success {
  color: #fff;
  background-color: $success-color;
  border-color: $success-color;
  &:hover,
  &:focus {
    background: $success-active-color;
    background-color: $success-active-color;
    color: #fff;
  }
}

.mu-button--info {
  color: #fff;
  background-color: $info-color;
  border-color: $info-color;
  &:hover,
  &:focus {
    background: $info-active-color;
    background-color: $info-active-color;
    color: #fff;
  }
}

.mu-button--warning {
  color: #fff;
  background-color: $warning-color;
  border-color: $warning-color;
  &:hover,
  &:focus {
    background: $warning-active-color;
    background-color: $warning-active-color;
    color: #fff;
  }
}

.mu-button--danger {
  color: #fff;
  background-color: $danger-color;
  border-color: $danger-color;
  &:hover,
  &:focus {
    background: $danger-active-color;
    background-color: $danger-active-color;
    color: #fff;
  }
}

// 拟态
.mu-button.is-mimicry {
  box-shadow: inset 3px 6px 10px #ccc, inset -3px -7px 10px #fff;
}

.mu-button--primary.is-mimicry {
  box-shadow: inset 3px 6px 10px #337ecc, inset -3px -7px 10px #4dbeff;
}
.mu-button--info.is-mimicry {
  box-shadow: inset 3px 6px 10px #73767a, inset -3px -7px 10px #adb0b8;
}
.mu-button--success.is-mimicry {
  box-shadow: inset 3px 6px 10px #6aa54e, inset -3px -7px 10px #a0f774;
}
.mu-button--warning.is-mimicry {
  box-shadow: inset 3px 6px 10px #bc914f, inset -3px -7px 10px #ffd977;
}
.mu-button--danger.is-mimicry {
  box-shadow: inset 3px 6px 10px #c45656, inset -3px -7px 10px #ff8282;
}

// 朴素按钮
.mu-button.is-plain {
  box-shadow: unset;
  &:hover,
  &:focus {
    background: #fff;
    border-color: #489eff;
    color: #409eff;
  }
}
.mu-button--primary.is-plain {
  box-shadow: unset;
  color: #409eff;
  background: #ecf5ff;
  &:hover,
  &:focus {
    background: #409eff;
    border-color: #409eff;
    color: #fff;
  }
}
.mu-button--success.is-plain {
  box-shadow: unset;
  color: #67c23a;
  background: #c2e7b0;
  &:hover,
  &:focus {
    background: #67c23a;
    border-color: #67c23a;
    color: #fff;
  }
}
.mu-button--info.is-plain {
  box-shadow: unset;
  color: #909399;
  background: #d3d4d6;
  &:hover,
  &:focus {
    background: #909399;
    border-color: #909399;
    color: #fff;
  }
}
.mu-button--warning.is-plain {
  box-shadow: unset;
  color: #e6a23c;
  background: #f5dab1;
  &:hover,
  &:focus {
    background: #e6a23c;
    border-color: #e6a23c;
    color: #fff;
  }
}
.mu-button--danger.is-plain {
  box-shadow: unset;
  color: #f56c6c;
  background: #fbc4c4;
  &:hover,
  &:focus {
    background: #f56c6c;
    border-color: #f56c6c;
    color: #fff;
  }
}
// round
.mu-button.is-round {
  border-radius: 20px;
  padding: 12px 23px;
}

// 圆形按钮
.mu-button.is-circle {
  border-radius: 50%;
  padding: 12px;
}

// 让图标和文字之间空开
.mu-button [class*='m-icon-'] + span {
  margin-left: 5px;
}

// 禁用
.mu-button.mu-button.is-disabled .mask {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(148, 146, 146, 0.39);
  left: 0;
  top: 0;
  box-shadow: 2px 2px 3px rgba(216, 213, 213, 0.3);
  border-radius: 4px;
  z-index: 100;
}
.mu-button.is-round .mask {
  border-radius: 20px;
}

.mu-button.is-circle .mask {
  border-radius: 50%;
}
.mu-button.is-disabled {
  cursor: no-drop;
  opacity: 0.5;
}
</style>
