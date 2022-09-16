<template>
  <transition name="message-fade">
    <div
      class="mu-message"
      :class="[
        position,
        `mu-message--${type}`,
        {'is-center': center}
      ]"
      :style="computedStyle"
      v-if="isShow"
    >
      <div class="mu-message__content">
        <!-- 图标 -->
        <i :class="getIconName"></i>
        <!-- 提示内容 -->
        {{ msg }}
        <!-- 关闭按钮 -->
        <span
          class="closeBtn"
          @click="closeMsg"
        >
          <i class="m-icon-quxiao"></i>
        </span>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Mu-Message', // 消息提示
  props: {
    // 提示信息
    msg: {
      type: String,
      default: '我是提示信息！'
    },
    // 显示时间
    time: {
      type: Number,
      default: 3000
    },
    // 自动关闭
    autoClose: {
      type: Boolean,
      default: true
    },
    // 文字居中
    center: {
      type: Boolean,
      default: false
    },
    // 位置
    position: {
      type: String,
      default: 'center',
      validator: value => ['center', 'leftTop', 'rightTop'].includes(value)
    },
    // 类型
    type: {
      type: String,
      default: 'info',
      validator: value => ['info', 'success', 'error', 'warning'].includes(value)
    }
  },
  data () {
    return {
      isShow: false,
      verticalTop: 0 // 垂直方向的top距离
    }
  },
  computed: {
    computedStyle () {
      return {
        top: this.verticalTop + 'px'
      }
    },
    getIconName () {
      const icons = {
        info: 'm-icon-icon-test32',
        success: 'm-icon-icon-test29',
        error: 'm-icon-icon-test26',
        warning: 'm-icon-icon-test37'
      }
      return icons[this.type]
    }
  },
  watch: {
    isShow (newValue) {
      if (!newValue) {
        // 监听过度结束事件
        this.$el.addEventListener('transitionend', () => {
          // 销毁实例 (触发 beforeDestroy 和 destroyed 的钩子)
          this.$destroy()
        })
        // 触发close事件
        this.$emit('close')
      }
    }
  },
  mounted () {
    if (this.autoClose) {
      // 开启定时器
      this.startTimer()
    }
    this.createElement()
  },
  beforeDestroy () {
    // 移除当前实例
    this.$el.parentNode.removeChild(this.$el)
  },
  methods: {
    // 开启定时器
    startTimer () {
      let timer = setTimeout(() => {
        this.isShow = false
      }, this.time)
      // 监听实例销毁
      this.$once('hook:beforeDestroy', () => {
        // 清除定时器
        clearTimeout(timer)
        timer = null
      })
    },
    // 创建元素
    createElement () {
      this.isShow = true
      // 添加实例到body
      document.body.appendChild(this.$el)
    },
    // 关闭提示框
    closeMsg () {
      this.isShow = false
    }
  }
}
</script>

<style lang="scss" scoped>
.mu-message {
  position: fixed;
  z-index: 99999;
  width: 380px;
  line-height: 20px;
  padding: 15px 15px 15px 20px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border-width: 1px;
  border-style: solid;
  border-color: #ebeef5;
  border-radius: 5px;
  background-color: #edf2fc;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  transition: top 0.5s;
}

.is-center{
  justify-content: center;
}

.closeBtn {
  position: absolute;
  right: 10px;
  // top: 50%;
  // transform: translateY(-50%);
  cursor: pointer;
  &:hover{
    transform: rotate(360deg);
    transition: all .3s;
  }
  & > i:hover{
    font-size: 18px;
    color: #409eff;
    transition: all .3s;
  }
}

.message-fade-enter,
.message-fade-leave-to {
  opacity: 0;
  transform: translateY(-100px);
}

.message-fade-enter-active,
.message-fade-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}

// 位置
.mu-message.center{
  left: 50%;
  transform: translateX(-50%);
}
.mu-message.leftTop{
  left: 16px;
}
.mu-message.rightTop{
  right: 16px;
}
// .mu-message.leftBottom{}
// .mu-message.rightBottom{}

// 类型
.mu-message--success {
  background-color: #f0f9eb;
  border-color: #e1f3d8;
}

.mu-message--success .mu-message__content {
  color: #67c23a;
}

.mu-message--warning {
  background-color: #fdf6ec;
  border-color: #faecd8;
}

.mu-message--warning .mu-message__content {
  color: #e6a23c;
}

.mu-message--error {
  background-color: #fef0f0;
  border-color: #fde2e2;
}

.mu-message--error .mu-message__content {
  color: #f56c6c;
}

.mu-message--info .mu-message__content {
  color: #909399;
}
</style>
