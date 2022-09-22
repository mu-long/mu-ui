<template>
  <transition name="dialog-fade">
    <!-- 遮罩 -->
    <!-- @click.self 点击自己才会触发 -->
    <div
      class="mu-dialog_wrapper"
      v-if="isShow"
      @click.self="cancelEvent"
    >
      <div
        class="mu-dialog"
        :style="{width, top}"
      >
        <!-- 标题 -->
        <div class="mu-dialog_header">
          {{ title }}
          <!-- 关闭按钮 -->
          <div
            class="closeBtn"
            @click="cancelEvent"
          >
            <i class="m-icon-icon-test28"></i>
          </div>
        </div>
        <!-- 内容 -->
        <div class="mu-dialog_body">
          {{ content }}
        </div>
        <!-- 底部 -->
        <div class="mu-dialog_footer">
          <template v-if="type === 'confirm'">
            <Mu-Button @click="cancelEvent()">取消</Mu-Button>
          </template>
          <Mu-Button
            type='primary'
            @click="sureEvent()"
          >确定</Mu-Button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Mu-MessageBox', // 消息框
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
    // 标题
    title: {
      type: String,
      default: '提示'
    },
    // 内容
    content: {
      type: String,
      default: '这是默认内容...'
    },
    // 类型
    type: {
      type: String,
      default: 'confirm',
      validator: value => ['confirm', 'alert'].includes(value)
    },
    // 是否销毁实例
    destroy: {
      type: Boolean,
      default: true
    },
    // 确定回调
    sureCallback: {
      type: Function,
      default: function () { this.isShow = false }
    },
    // 取消回调
    cancelCallback: {
      type: Function,
      default: function () { this.isShow = false }
    }
  },
  data () {
    return {
      isShow: false // 是否显示弹框
    }
  },
  watch: {
    isShow (newValue) {
      if (!newValue) {
        this.isShow = false
        // 如果允许销毁
        console.log('允许销毁1 ==> ', this.destroy)
        if (this.destroy) {
          // 监听动画结束事件
          this.$el.addEventListener('animationend', () => {
            console.log('允许销毁2 ==> ', this.destroy)
            // 销毁实例 (触发 beforeDestroy 和 destroyed 的钩子)
            this.$destroy()
          })
        }
      } else {
        this.isShow = true
      }
    }
  },
  mounted () {
    this.createElement()
  },
  beforeDestroy () {
    // 如果允许销毁
    console.log('允许销毁3 ==> ', this.destroy)
    if (this.destroy && this.isShow === false) {
      // 移除当前实例
      this.$el.parentNode.removeChild(this.$el)
    }
  },
  methods: {
    // 创建元素
    createElement () {
      this.isShow = true
      // 添加实例到body
      document.body.appendChild(this.$el)
    },
    // 关闭对话框
    handleCloseDialog () {
      console.log('close')
      this.isShow = false
    },
    // 确定事件
    sureEvent () {
      console.log('sure...')
      this.sureCallback()
      this.handleCloseDialog()
    },
    // 取消事件
    cancelEvent () {
      console.log('cancel...')
      this.cancelCallback()
      this.handleCloseDialog()
    }
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
