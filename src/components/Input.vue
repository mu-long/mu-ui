<template>
  <div
    class="mu-input"
    :class="{'suffix': showSuffix}"
  >
    <template v-if="type === 'textarea'">
      <!-- 文本域 -->
      <textarea
        class="mu-textarea__inner"
        :class="{'is-disabled': disabled}"
        :name="name"
        :rows="rows"
        :disabled="disabled"
        :placeholder="placeholder"
        :value="value"
        @input="handleInput"
        @change="handleChange"
      ></textarea>
    </template>

    <template v-else>
      <div :class="
        {
          'mu-input-group' : $slots.prepend || $slots.append,
          'mu-input-group--prepend': $slots.prepend,
          'mu-input-group--append': $slots.append,
        }">
        <!-- 前置元素 -->
        <div
          class="mu-input-group__prepend"
          v-if="$slots.prepend"
        >
          <slot name="prepend"></slot>
        </div>

        <!-- 输入框 -->
        <div class="mu-input_container">
          <!-- 设置input类型：如果是密码，就控制显示与隐藏 -->
          <input
            class="mu-input__inner"
            :class="{
              'is-disabled': disabled,
              'is-center': center
            }"
            :style="{width}"
            :type="showPassword ? (showPwd ? 'text' : 'password') : type"
            :name="name"
            :disabled="disabled"
            :placeholder="placeholder"
            autocomplete="off"
            :value="value"
            @input="handleInput"
            @change="handleChange"
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

        <!-- 后置元素 -->
        <div
          class="mu-input-group__append"
          v-if="$slots.append"
        >
          <slot name="append"></slot>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'Mu-Input', // 输入框
  props: {
    // 类型
    type: {
      type: String,
      default: 'text',
      validator: value => ['text', 'password', 'textarea'].includes(value)
    },
    // 值
    value: {
      type: [String, Number],
      default: ''
    },
    // 名称
    name: {
      type: String,
      default: ''
    },
    // 提示占位符
    placeholder: {
      type: String,
      default: ''
    },
    // 输入框宽度
    width: {
      type: String,
      default: '180px'
    },
    // 文本域高度
    rows: {
      type: Number,
      default: 2
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    },
    // 文字居中
    center: {
      type: Boolean,
      default: false
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
    // 输入框发生变化时
    handleChange () {
      // 强制组件更新
      this.$forceUpdate()
      console.log('输入框发生变化...')
    },
    // 清除输入框
    clearInput () {
      this.$emit('input', '')
    },
    // 控制密码显示与隐藏
    handlePassword () {
      this.showPwd = !this.showPwd
    }
  }
}
</script>

<style lang="scss" scoped>
.mu-input {
  position: relative;
  font-size: 14px;
  display: inline-block;

  // 输入框样式
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
    padding: 10px;
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

    // 文字居中
    &.is-center{
      text-align: center;
    }
  }

  // 文本域样式
  .mu-textarea__inner {
    display: block;
    resize: vertical;
    padding: 5px 15px;
    line-height: 1.5;
    box-sizing: border-box;
    width: 100%;
    font-size: inherit;
    color: #606266;
    background-color: #fff;
    background-image: none;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);

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

  // 输入框组
  .mu-input-group {
    line-height: normal;
    display: inline-table;
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;

    .mu-input-group__prepend,
    .mu-input-group__append {
      background-color: #f5f7fa;
      color: #909399;
      vertical-align: middle;
      display: table-cell;
      position: relative;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      padding: 0 20px;
      width: 1px;
      white-space: nowrap;
      &:hover .compute_btn{
        color: #409eff;
      }
    }

    // 前缀
    .mu-input-group__prepend {
      border-right: 0;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    // 后缀
    .mu-input-group__append {
      border-left: 0;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }

  // 有前缀时 输入框样式
  .mu-input-group--prepend .mu-input__inner {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  // 有后缀时 输入框样式
  .mu-input-group--append .mu-input__inner {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
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
