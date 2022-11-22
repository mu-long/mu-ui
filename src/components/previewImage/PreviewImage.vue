<template>
  <transition name="dialog-fade">
    <div
      class="mu_previewImage"
      v-if="isShow"
    >
      <!-- 遮罩 -->
      <div class="mask"></div>

      <!-- 关闭按钮 -->
      <div
        class="imageViewer_btn close"
        @click="hide"
        title="关闭预览"
      >
        <i class="iconfont m-icon-quxiao"></i>
      </div>

      <!-- 切换图片 -->
      <template v-if="!isSingle">
        <div
          class="imageViewer_btn prev"
          title="上一张"
          @click="prev"
        >
          <i class="iconfont  m-icon-jiantouzuo"></i>
        </div>
        <div
          class="imageViewer_btn next"
          title="下一张"
          @click="next"
        >
          <i class="iconfont m-icon-jiantouyou"></i>
        </div>
      </template>

      <!-- 操作组 -->
      <div class="imageViewer_btn actions">
        <div class="inner">
          <i
            class="iconfont m-icon-sousuofangda"
            title="放大图片"
            @click="handleActions('zoomIn')"
          ></i>
          <i
            class="iconfont m-icon-suoxiao1"
            title="缩小图片"
            @click="handleActions('zoomOut')"
          ></i>
          <i
            v-if="!isFullScreen"
            class="iconfont m-icon-quanping-01"
            title="全屏"
            @click="toggleFullScreen"
          ></i>
          <i
            v-else
            class="iconfont m-icon-tuichuquanping-01"
            title="退出全屏"
            @click="toggleFullScreen"
          ></i>
          <i
            class="iconfont m-icon-xuanzhuan-2"
            title="向左旋转90°"
            @click="handleActions('rotateLeft')"
          ></i>
          <i
            class="iconfont m-icon-xuanzhuan-1"
            title="向右旋转90°"
            @click="handleActions('rotateRight')"
          ></i>
        </div>
      </div>

      <!-- 图片显示区域 -->
      <div
        class="img_box"
        ref="img_box"
        @click.self="hide"
        @mousedown="handleMousedown($event)"
        @mousemove="handleMousemove($event)"
        @mouseup="handleMouseup($event)"
        @mouseout="handleMouseout($event)"
        @mousewheel.prevent="handleMousewheel($event)"
      >
        <template v-for="(url, ind) in urlList">
          <img
            class="pic"
            ref="picRef"
            v-if="ind === index"
            :key="url"
            :src="currentImg"
            :style="imgStyle"
            @load="handleImgLoad"
            @error="handleImgError"
          >
        </template>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Mu-PreviewImage', // 预览图片
  props: {
    // 图片地址
    urlList: {
      type: Array,
      default: null
    },
    // 初始的下标
    initialIndex: {
      type: Number,
      default: 0
    },
    // 缩放步长
    scaleStep: {
      type: Number,
      default: 0.05
    },
    // 最大缩放比例
    maxScale: {
      type: Number,
      default: 3
    },
    // 最小缩放比例
    minScale: {
      type: Number,
      default: 0.5
    }
    // 确定回调
    // sureCallback: {
    //   type: Function,
    //   default: function () { this.isShow = false }
    // }
  },
  data () {
    return {
      isShow: false, // 是否显示
      isLoading: false, // 是否正在加载中
      index: this.initialIndex, // 图片下标
      // imageW: 0, // 图片宽高
      // imageH: 0,
      isDragImg: false, // 是否拖拽图片
      isFullScreen: false, // 是否全屏

      scale: 1, // 缩放比例
      rotateDeg: 0, // 旋转角度
      marginLeft: 0, // 图片margin
      marginTop: 0,
      oldMarginLeft: 0, // 图片上一次margin
      oldMarginTop: 0,
      enableTransition: false // 启用过渡
    }
  },
  computed: {
    // 是否是单张图片
    isSingle () {
      return this.urlList.length <= 1
    },
    // 是否是第一张图片
    isFirst () {
      return this.index === 0
    },
    // 是否是最后一张图片
    isLast () {
      return this.index === this.urlList.length - 1
    },
    // 当前的图片
    currentImg () {
      return this.urlList[this.index]
    },
    // 图片样式
    imgStyle () {
      const { scale, rotateDeg, marginLeft, marginTop, isFullScreen, enableTransition } = this
      return {
        transform: `scale(${scale}) rotate(${rotateDeg}deg)`,
        transition: enableTransition ? 'transform 0.3s ease' : '',
        marginLeft: `${marginLeft}px`,
        marginTop: `${marginTop}px`,
        maxHeight: isFullScreen ? '' : '100%',
        maxWidth: isFullScreen ? '' : '100%'
      }
    }
  },
  watch: {
    // 监听下标变化
    index: {
      handler: function (val) {
        this.reset()
      }
    },
    // 监听当前图片变化
    currentImg () {
      // 把 cb 回调推迟到下一个 DOM 更新周期之后执行
      this.$nextTick(() => {
        console.log('this.$refs.picRef[0]', this.$refs.picRef[0])
        // 判断图片是否完全加载完成
        if (!this.$refs.picRef[0].complete) {
          this.isLoading = true
        }
      })
    }
  },
  mounted () {
    this.createElement()
    console.log('this.$refs', this.$refs)

    // 把 cb 回调推迟到下一个 DOM 更新周期之后执行
    this.$nextTick(() => {
      this.img_box = this.$refs.img_box
      console.log('this.img_box', this.img_box)
    })
  },
  methods: {
    // 创建元素
    createElement () {
      // 添加实例到body
      document.body.appendChild(this.$el)
      this.isShow = true
    },
    // 重置图片相关信息
    reset () {
      this.scale = 1
      this.rotateDeg = 0
      this.marginLeft = 0
      this.marginTop = 0
      this.enableTransition = false
    },
    // 隐藏
    hide () {
      this.isShow = false
    },
    // 显示
    show () {
      this.isShow = true
    },
    // 处理图片加载成功
    handleImgLoad () {
      this.isLoading = false
    },
    // 处理图片加载失败
    handleImgError (ev) {
      this.isLoading = false
      ev.target.alt = '图片加载失败!'
    },
    // 切换全屏状态
    toggleFullScreen () {
      if (this.loading) return

      this.isFullScreen = !this.isFullScreen
      this.reset()
    },
    // 上一张
    prev () {
      const len = this.urlList.length
      /*
        假如有3张图片
        (0 - 1 + 3) % 3 // 2
        (2 - 1 + 3) % 3 // 1
        (1 - 1 + 3) % 3 // 0
        (0 - 1 + 3) % 3 // 2
      */
      this.index = (this.index - 1 + len) % len
      // this.isFullScreen = false
    },
    // 下一张
    next () {
      const len = this.urlList.length
      /*
        假如有3张图片
        0%3 // 0
        1%3 // 1
        2%3 // 2
        3%3 // 0
        4%3 // 1
        5%3 // 2
      */
      this.index = (this.index + 1) % len
      // this.isFullScreen = false
    },
    // 操作
    handleActions (type, enableTransition = true) {
      if (this.loading) return

      const { scaleStep, minScale, maxScale } = this
      console.log('操作', type)
      switch (type) {
        // 放大图片
        case 'zoomIn':
          // 修改缩放比例
          this.scale += scaleStep
          this.scale = this.scale >= maxScale ? maxScale : this.scale
          break
        // 缩小图片
        case 'zoomOut':
          this.scale -= scaleStep
          this.scale = this.scale <= minScale ? minScale : this.scale
          break
        // 向左旋转90°
        case 'rotateLeft':
          this.rotateDeg -= 90
          break
        // 向右旋转90°
        case 'rotateRight':
          this.rotateDeg += 90
          break
        default:
          break
      }
      this.enableTransition = enableTransition
    },

    // 鼠标按下事件
    handleMousedown (ev) {
      ev.preventDefault()
      console.log('鼠标按下...')
      // console.log('当前点击的元素', ev.target)
      // console.log('获得点击元素的class属性列表', ev.target.classList)
      if (this.loading) return

      // 判断是否点击目标元素
      if (Array.from(ev.target.classList).includes('pic')) {
        console.log('鼠标坐标', ev.clientX, ev.clientY)
        // console.log('获取目标元素的大小及其相对于视口的位置', ev.target.getBoundingClientRect())
        // const { width, height } = ev.target.getBoundingClientRect()

        // this.imageW = Math.round(Number(width))
        // this.imageH = Math.round(Number(height))

        // 记录图片上一次偏移量
        this.oldMarginLeft = this.marginLeft
        this.oldMarginTop = this.marginTop
        console.log('图片margin', this.marginLeft, this.marginTop)

        // 判断按下了鼠标的那个键
        if (ev.button === 0) {
          console.log('点击鼠标左键，拖拽图片')
          this.img_box.style.cursor = 'grab'
          this.isDragImg = true

          // 记录鼠标起始位置
          this.startX = ev.clientX
          this.startY = ev.clientY
          // console.log('鼠标相对于图片的偏移量', this.imgOffsetX, this.imgOffsetY)
        }
      }
    },

    // 鼠标移动
    handleMousemove (ev) {
      ev.preventDefault()

      if (this.isDragImg) {
        console.log('拖拽图片')
        this.img_box.style.cursor = 'grab'

        const { oldMarginLeft, oldMarginTop, startX, startY } = this

        // 计算图片margin (图片上一次偏移量 + 鼠标新坐标 - 鼠标起始位置)
        this.marginLeft = oldMarginLeft + ev.clientX - startX
        this.marginTop = oldMarginTop + ev.clientY - startY
        console.log('图片margin', this.marginLeft, this.marginTop)
      }
    },

    // 鼠标抬起事件
    handleMouseup (ev) {
      ev.preventDefault()
      console.log('鼠标抬起...')
      // 恢复默认状态
      this.isDragImg = false
    },

    // 鼠标离开事件
    handleMouseout (ev) {
      ev.preventDefault()
      console.log('鼠标离开...')
      // 恢复默认状态
      this.img_box.style.cursor = 'auto'
    },

    // 鼠标滚轮事件
    handleMousewheel (ev) {
      // 判断是否支持e.detail 支持的话说明是火狐
      const delta = ev.wheelDelta ? ev.wheelDelta : -ev.datail

      if (delta > 0) {
        this.img_box.style.cursor = 'zoom-in'
        // 放大图片
        this.handleActions('zoomIn', false)
      } else {
        this.img_box.style.cursor = 'zoom-out'
        // 缩小图片
        this.handleActions('zoomOut', false)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
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

.mu_previewImage {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999999;

  .mask {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0.5;
    background: #000;
    z-index: -1;
  }

  .imageViewer_btn {
    cursor: pointer;
    position: absolute;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    opacity: 0.8;
    box-sizing: border-box;
    user-select: none;

    &.close {
      top: 40px;
      right: 40px;
      width: 40px;
      height: 40px;
      font-size: 24px;
      color: #fff;
      background-color: #606266;
    }

    &.next,
    &.prev {
      top: 50%;
      transform: translateY(-50%);
      width: 44px;
      height: 44px;
      font-size: 24px;
      color: #fff;
      background-color: #606266;
      border-color: #fff;
    }

    &.prev {
      left: 40px;
    }

    &.next {
      right: 40px;
      text-indent: 2px;
    }
  }

  .actions {
    cursor: default;
    left: 50%;
    bottom: 30px;
    transform: translateX(-50%);
    width: 282px;
    height: 44px;
    padding: 0 23px;
    background-color: #606266;
    border-color: #fff;
    border-radius: 22px;

    .inner {
      width: 100%;
      height: 100%;
      text-align: justify;
      font-size: 23px;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: space-around;
    }

    i {
      cursor: pointer;
    }
  }

  .img_box {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    // position: relative;
    // border: 2px solid red;

    // img {
    // position: absolute;
    // top: 50%;
    // left: 0;
    // transition: transform 0.3s ease;
    // }
  }
}
</style>
