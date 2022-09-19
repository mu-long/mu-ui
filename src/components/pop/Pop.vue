<template>
  <div
    class="pop"
    :class="{'shake': type === 'shake'}"
    :style="{'top': top}"
    v-if="isShow"
  >{{ msg }}</div>
</template>

<script>
export default {
  name: 'Mu-Pop', // pop 气泡弹框
  props: {
    // 弹框类型 ('' 默认；'shake' 摇摆)
    type: {
      type: String,
      default: ''
    },
    // 弹框提示信息
    msg: {
      type: String,
      default: '我是气泡弹框~'
    },
    // 显示时间
    time: {
      type: Number,
      default: 3000
    },
    // 位置
    top: {
      type: String,
      default: '15%'
    }
  },
  data () {
    return {
      isShow: false // 是否显示弹框
    }
  },
  watch: {
    isShow (newVal, oldVal) {
      if (newVal !== oldVal) {
        setTimeout(() => {
          // 销毁实例 (触发 beforeDestroy 和 destroyed 的钩子)
          this.$destroy()
        }, this.time)
      }
    }
  },
  mounted () {
    this.createElement()
  },
  beforeDestroy () {
    // 移除当前实例
    this.$el.parentNode.removeChild(this.$el)
  },
  methods: {
    // 创建元素
    createElement () {
      this.isShow = true
      // 添加实例到body
      document.body.appendChild(this.$el)
    }
  }
}
</script>

<style lang="scss" scoped>

// 摇摆
@keyframes shake {
  0%,
  100% {
    transform: translateX(-50%) translateY(-50%);
  }
  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translateX(-45%) translateY(-50%);
  }
  20%,
  40%,
  60%,
  80% {
    transform: translateX(-55%) translateY(-50%);
  }
}

.shake {
  animation: shake 0.3s linear;
}

.pop{
  z-index: 999999;
  position: fixed;
  top: 15%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 15px;
  font-size: 16px;
  color: #fff;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 5px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
}
</style>
