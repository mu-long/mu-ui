<template>
  <label
    class="mu-radio"
    :class="{'is-checked': isChecked}"
  >
    <span class="mu-radio__input">
      <span
        class="mu-radio__inner"
        :style="{
          borderColor: isChecked ? color : '',
          backgroundColor: isChecked ? color : ''
        }"
      ></span>
      <!-- <span class="mu-radio__inner"></span> -->
      <input
        class="mu-radio__original"
        type="radio"
        :name="name"
        :value="label"
        v-model="model"
      />
    </span>
    <span
      class="mu-radio__label"
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
  name: 'Mu-Radio', // 单选
  // inject 注入
  inject: {
    RadioGroup: {
      default: ''
    }
  },
  props: {
    // 标签
    label: {
      type: [String, Boolean, Number],
      default: ''
    },
    value: null,
    name: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: ''
    }
  },
  computed: {
    // 判断是否被 RadioGroup 包裹
    isGroup () {
      return !!this.RadioGroup
    },
    // 更改选中状态
    model: {
      get () {
        // 被 RadioGroup 包裹，就使用 RadioGroup的 value
        return this.isGroup ? this.RadioGroup.value : this.value
      },
      set (value) {
        // 触发父组件input事件
        this.isGroup ? this.RadioGroup.$emit('input', value) : this.$emit('input', value)
      }
    },
    // 是否选中
    isChecked () {
      return this.label.toString() === this.model.toString()
    }
  },
  mounted () {
    // 同步数据
    this.model = this.isGroup ? this.RadioGroup.value : this.value
  }
}
</script>

<style scoped lang="scss">
.mu-radio {
  color: #606266;
  font-weight: 500;
  line-height: 1;
  position: relative;
  cursor: pointer;
  display: inline-block;
  white-space: nowrap;
  outline: none;
  font-size: 14px;
  margin-right: 30px;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;

  .mu-radio__input {
    white-space: nowrap;
    cursor: pointer;
    outline: none;
    display: inline-block;
    line-height: 1;
    position: relative;
    vertical-align: middle;

    .mu-radio__inner {
      border: 1px solid #dcdfe6;
      border-radius: 100%;
      width: 14px;
      height: 14px;
      background-color: #fff;
      //   background-color: #409eff;
      position: relative;
      cursor: pointer;
      display: inline-block;
      box-sizing: border-box;
    }

    .mu-radio__inner.is-mimicry {
      box-shadow: inset 4px 2px 6px #cacaca48,
        inset -4px -2px 6px rgba(255, 255, 255, 0.377);
    }

    .mu-radio__inner:after {
      width: 4px;
      height: 4px;
      border-radius: 100%;
      background-color: #fff;
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%) scale(0);
      transition: transform 0.15s ease-in;
    }

    .mu-radio__original {
      opacity: 0;
      outline: none;
      position: absolute;
      z-index: -1;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: 0;
    }
  }
  .mu-radio__label {
    font-size: 14px;
    padding-left: 10px;
  }
}

.mu-radio.is-checked {
  .mu-radio__input {
    .mu-radio__inner {
      border-color: #409eff;
      background-color: #409eff;
      &::after {
        transform: translate(-50%, -50%) scale(1);
      }
    }
  }
  .mu-radio__label {
    color: #409eff;
  }
}
</style>
