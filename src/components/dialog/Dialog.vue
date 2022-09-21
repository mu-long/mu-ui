<template>
  <transition name="dialog-fade">
    <!-- 遮罩 -->
    <!-- @click.self 点击自己才会触发 -->
    <div
      class="mu-dialog_wrapper"
      v-if="isShow"
      @click.self="handleCloseDialog"
    >
      <div
        class="mu-dialog"
        :style="{width, top}"
      >
        <!-- 标题 -->
        <div class="mu-dialog_header">
          <!-- title 支持slot插槽 -->
          <slot name="title">
            <span class="mu-dialog_title">{{ title }}</span>
          </slot>
          <!-- 关闭按钮 -->
          <div
            class="closeBtn"
            @click="handleCloseDialog"
          >
            <i class="m-icon-icon-test28"></i>
          </div>
        </div>
        <!-- 内容 -->
        <div class="mu-dialog_body">
          <!-- 插槽 -->
          <slot name="body"></slot>
        </div>
        <!-- 底部 -->
        <div class="mu-dialog_footer">
          <!-- 插槽 -->
          <slot
            name="footer"
            v-if="hasFoolt"
          >
            <Mu-Button @click="cancelCallback()">取消</Mu-Button>
            <Mu-Button
              type='primary'
              @click="sureCallback()"
            >确定</Mu-Button>
          </slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Mu-Dialog', // 对话框
  props: {
    // 宽度
    width: {
      type: String,
      default: '50%'
    },
    // 距离底部距离
    top: {
      type: String,
      default: '15vh'
    },
    // 是否显示弹框
    isShow: {
      type: Boolean,
      default: false
    },
    // 标题
    title: {
      type: String,
      default: '提示'
    },
    // 是否包含底部
    hasFoolt: {
      type: Boolean,
      default: true
    },
    // 是否销毁实例
    destroy: {
      type: Boolean,
      default: false
    },
    // 确定回调
    sureCallback: {
      type: Function,
      default: function () { this.$emit('update:isShow', false) }
    },
    // 取消回调
    cancelCallback: {
      type: Function,
      default: function () { this.$emit('update:isShow', false) }
    }
  },
  watch: {
    isShow (newValue) {
      if (!newValue) {
        // 如果允许销毁
        if (this.destroy) {
          // 监听过度结束事件
          this.$el.addEventListener('transitionend', () => {
            // 销毁实例 (触发 beforeDestroy 和 destroyed 的钩子)
            this.$destroy()
          })
        }
        // 触发父组件更新数据
        this.$emit('update:isShow', false)
      } else {
        // 触发父组件更新数据
        this.$emit('update:isShow', true)
      }
    }
  },
  mounted () {
    this.createElement()
  },
  beforeDestroy () {
    // 如果允许销毁
    if (this.destroy) {
      // 移除当前实例
      this.$el.parentNode.removeChild(this.$el)
    }
  },
  methods: {
    // 创建元素
    createElement () {
      // 添加实例到body
      document.body.appendChild(this.$el)
    },
    // 关闭对话框
    handleCloseDialog () {
      console.log('close')
      // 取消回调
      this.cancelCallback()
      // this.$emit('closeDialog', false)
      // 触发父组件更新数据
      this.$emit('update:isShow', false)
    }
    // 确定事件
    // sureEvent () {
    //   console.log('sure...')
    //   this.sureCallback()
    //   this.handleCloseDialog()
    // },
    // // 取消事件
    // cancelEvent () {
    //   console.log('cancel...')
    //   this.cancelCallback()
    //   this.handleCloseDialog()
    // }
  }
}
</script>

<style lang="scss" scoped>
// 遮罩
.mu-dialog_wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: -3vh;
  left: 0;
  overflow: auto;
  margin: 0;
  z-index: 2001;
  background-color: rgba(0, 0, 0, 0.5);

  .mu-dialog {
    position: relative;
    width: 50%;
    top: 15vh;
    margin: auto;
    // margin: 15vh auto 50px;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    box-sizing: border-box;

    &_header {
      padding: 20px 20px 10px;
      display: flex;
      justify-content: space-between;

      .mu-dialog_title {
        line-height: 24px;
        font-size: 18px;
        color: #303133;
      }

      .closeBtn{
        width: 16px;
        height: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        & > i:hover{
          font-size: 18px;
          color: #409eff;
          transition: all .3s;
        }
      }
    }

    &_body {
      padding: 30px 20px;
      color: #606266;
      font-size: 14px;
      // CSS 属性 word-break 指定了怎样在单词内断行
      word-break: break-all;
    }

    &_footer {
      padding: 10px 20px 20px;
      text-align: right;
      box-sizing: border-box;
      // 深度选择器 样式穿透
      ::v-deep .mu-button:first-child {
        margin-right: 20px;
      }
    }
  }
  // 拟态风格
  // .mu-dialog.is-mimicry {
  //   border-radius: 12px;
  //   box-shadow: inset 7px 14px 23px #dadada, inset -7px -14px 23px #eeeeee;
  // }
}

// 动画 逐渐消失
.dialog-fade-enter-active {
  animation: fade 0.5s;
}

.dialog-fade-leave-active {
  // reverse 动画反向播放
  animation: fade 0.4s reverse;
}

@keyframes fade {
  from {
    opacity: 0;
    transform: translateY(-3vh);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
