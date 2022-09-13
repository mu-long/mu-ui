<template>
  <label
    class="mu-checkbox"
    :class="{'is-checked': isChecked}"
  >
    <span class="mu-checkbox__input">
      <span
        class="mu-checkbox__inner"
        :style="{
          borderColor: isChecked ? color : '',
          backgroundColor: isChecked ? color : ''
        }"
      ></span>
      <input
        class="mu-checkbox__original"
        type="checkbox"
        :name="name"
        :value="label"
        v-model="model"
      />
    </span>
    <span
      class="mu-checkbox__label"
      :style="{
        color: isChecked ? color : ''
      }"
    >
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script>
export default {
  name: 'Mu-Checkbox', // 复选框
  // inject 注入
  inject: {
    CheckboxGroup: {
      default: ''
    }
  },
  props: {
    // 标签
    label: {
      type: String,
      default: ''
    },
    value: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: '#409eff'
    }
  },
  computed: {
    // 判断是否被 CheckboxGroup 包裹
    isGroup () {
      return !!this.CheckboxGroup
    },
    // 更改选中状态
    model: {
      get () {
        // 被 CheckboxGroup 包裹，就使用 CheckboxGroup 的 value
        return this.isGroup ? this.CheckboxGroup.value : this.value
      },
      set (value) {
        // 触发父组件input事件
        this.isGroup ? this.CheckboxGroup.$emit('input', value) : this.$emit('input', value)
      }
    },
    // 是否选中
    isChecked () {
      // 被 CheckboxGroup 包裹，this.model就是一个数组，要判断是否包含当前元素，确定是否选中
      // 没有被 CheckboxGroup 包裹，this.model就是一个布尔值
      return this.isGroup ? this.model.includes(this.label) : this.model
    }
  }
}
</script>

<style scoped lang="scss">
.mu-checkbox {
  color: #606266;
  font-weight: 500;
  font-size: 14px;
  position: relative;
  cursor: pointer;
  display: inline-block;
  white-space: nowrap;
  user-select: none;
  margin-right: 30px;

  .mu-checkbox__input {
    white-space: nowrap;
    cursor: pointer;
    outline: none;
    display: inline-block;
    line-height: 1;
    position: relative;
    vertical-align: middle;

    .mu-checkbox__inner {
      display: inline-block;
      position: relative;
      border: 1px solid #dcdfe6;
      border-radius: 2px;
      box-sizing: border-box;
      width: 14px;
      height: 14px;
      background-color: #fff;
      z-index: 1;
      transition: border-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46),
        background-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46);
      &:after {
        // 这里使用边框实现对勾的样式
        box-sizing: content-box;
        content: '';
        border: 1px solid #fff;
        border-left: 0;
        border-top: 0;
        height: 7px;
        width: 3px;
        position: absolute;
        left: 4px;
        top: 1px;
        transform: rotate(45deg) scaleY(1);
        transition: transform 0.15s ease-in 0.05s;
        transform-origin: center;
      }
    }

    .mu-checkbox__original {
      opacity: 0;
      outline: none;
      position: absolute;
      margin: 0;
      width: 0;
      height: 0;
      z-index: -1;
    }
  }

  .mu-checkbox__label {
    display: inline-block;
    padding-left: 10px;
    line-height: 19px;
    font-size: 14px;
  }
}

// 父元素的最后的一个子元素d-checkbox取消margin-right，也包括嵌套子元素的最后一个d-checkbox
.mu-checkbox:last-of-type {
  margin-right: 0;
}

.mu-checkbox.is-checked {
  .mu-checkbox__inner {
    background-color: #409eff;
    border-color: #409eff;
    &:after {
      transform: rotate(45deg) scaleY(1);
    }
  }
  .mu-checkbox__label {
    color: #409eff;
  }
}

.mu-checkbox.is-disabled {
  .mu-checkbox__inner {
    background-color: #edf2fc;
    border-color: #dcdfe6;
    cursor: not-allowed;
  }
  span.mu-checkbox__label {
    color: #c0c4cc;
    cursor: not-allowed;
  }
}

.mu-checkbox.is-mimicry {
  .mu-checkbox__inner {
    box-shadow: inset 3px 2px 4px #cacaca48,
      inset -3px -2px 4px rgba(255, 255, 255, 0.377);
  }
}
</style>
