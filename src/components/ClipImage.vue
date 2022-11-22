<template>
  <div class="clipImage">
    <!-- 画布区域 -->
    <div
      class="canvas_box"
      ref="canvas_box"
      :style="{
        width: canvasW + 2 + 'px',
        height: canvasH + 2 + 'px'
      }"
      @mousedown="handleMousedown($event)"
      @mousemove="handleMousemove($event)"
      @mouseup="handleMouseup($event)"
      @mouseout="handleMouseout($event)"
      @mousewheel.prevent="handleMousewheel($event)"
    >
      <!-- 画布 -->
      <canvas
        :width="canvasW"
        :height="canvasH"
        ref="canvas"
        v-show="image"
      ></canvas>
      <!-- 提示 -->
      <div
        class="tip_box"
        v-show="!image"
      >
        <h2>请选择需要裁切的图片文件！</h2>
      </div>
      <!-- 裁切区域 -->
      <div
        v-show="isShowMask"
        class="mask"
        :style="{
          width: canvasW * 0.7 + 'px',
          height: canvasH * 0.7 + 'px',
          left: maskLeft + 'px',
          top: maskTop + 'px',
          'box-shadow': `rgba(0, 0, 0, 0.7) 0 0 0 ${canvasW}px`
        }"
      ></div>
    </div>

    <input
      ref="file"
      class="file"
      type="file"
      accept="image/*"
      @change="handleInputChange"
    >

    <!-- 操作区域 -->
    <div class="operate_area_box">
      <Mu-Button
        type='primary'
        size='mini'
        @click="handleSelectFile"
      >选择图片</Mu-Button>
      <!-- 放大图片 -->
      <Mu-Button
        circle
        type='normal'
        size='mini'
        icon='m-icon-jia'
        title="放大"
        @click="handleScale(1, true)"
      ></Mu-Button>
      <!-- 缩小图片 -->
      <Mu-Button
        circle
        type='normal'
        size='mini'
        icon='m-icon-jian'
        title="缩小"
        @click="handleScale(0, true)"
      ></Mu-Button>
      <Mu-Button
        type='warning'
        size='mini'
        @click="handlePreviewImage"
      >预览图片</Mu-Button>
      <Mu-Button
        size='mini'
        bgColor='hotpink'
        fontColor='#fff'
        @click="handleClipImage"
      >裁切图片</Mu-Button>
      <Mu-Button
        type='success'
        size='mini'
        @click="handleSaveImage"
      >保存图片</Mu-Button>
    </div>
  </div>
</template>

<script>
import { downloadFile } from '@/utils/index'
export default {
  name: 'Mu-ClipImage',
  data () {
    const canvasW = 385
    const canvasH = 385
    const maskW = canvasW * 0.7
    const maskH = canvasW * 0.7

    return {
      canvasW: canvasW, // canvas宽高
      canvasH: canvasH,

      isShowMask: false, // 是否显示遮罩
      maskW: maskW, // 遮罩宽高与位置
      maskH: maskH,
      maskTop: (canvasW - maskW) / 2,
      maskLeft: (canvasH - maskH) / 2,
      clipImgInfo: '', // 裁切图片信息

      // 缩放比例
      scale: 1,
      // 上一次的缩放比例
      oldScale: 1,
      // 缩放步长
      scaleStep: 0.1,
      // 最大缩放比例
      maxScale: 4,
      // 最小缩放比例
      minScale: 0.5,

      image: null,
      imageW: 0, // 图片宽高
      imageH: 0,
      imageTop: 0, // 图片绘制位置(左上角)
      imageLeft: 0,
      // 是否重置图片位置
      resetImgPosition: true,
      isDragImg: false, // 是否拖拽图片
      imgOffsetX: null, // 拖拽图片的偏移量
      imgOffsetY: null,

      mouseInCanvasX: null, // 鼠标在画布中的坐标
      mouseInCanvasY: null
    }
  },
  mounted () {
    this.canvas_box = this.$refs.canvas_box
    // 获取画布
    this.canvas = this.$refs.canvas
    // 创建2D画笔
    this.ctx = this.canvas.getContext('2d')
  },
  methods: {
    // 选择文件
    handleSelectFile () {
      // 触发input的chang事件
      this.$refs.file.click()
    },

    // 监听文件变化
    handleInputChange () {
      console.dir(this.$refs.file)
      const file = this.$refs.file.files[0]
      console.log('file ==>', file)
      if (!file) return

      const fileReader = new FileReader()
      // 读取文件，转换成base64
      fileReader.readAsDataURL(file)

      fileReader.onload = e => {
        // 创建图片
        this.image = new Image()
        this.image.src = e.target.result

        this.image.onload = () => {
          this.imageW = this.image.width
          this.imageH = this.image.height

          // 重置图片位置
          this.resetImgPosition = true
          // 重置数据
          this.scale = 1
          this.oldScale = 1
          this.clipImgInfo = null

          // 绘制图片
          this.drawImage()
        }
        // 显示遮罩
        this.isShowMask = true
      }
    },

    // 绘制图片
    drawImage () {
      // 重新按照比例计算宽高
      let n = 1
      if (this.imageW > this.imageH) {
        // 图片 宽 > 高
        n = this.imageW / this.canvasW
        this.imageW = this.canvasW
        this.imageH = this.imageH / n
      } else {
        // 图片 宽 < 高
        n = this.imageH / this.canvasH
        this.imageH = this.canvasH
        this.imageW = this.imageW / n
      }

      // 缩放图片
      this.imageW = Math.round(this.imageW * this.scale)
      this.imageH = Math.round(this.imageH * this.scale)

      // 判断是否重置图片位置
      if (this.resetImgPosition) {
        // 图片绘制位置
        this.imageLeft = (this.canvasW - this.imageW) / 2
        this.imageTop = (this.canvasH - this.imageH) / 2
        this.resetImgPosition = false
      }

      this.imageLeft = Math.round(this.imageLeft)
      this.imageTop = Math.round(this.imageTop)

      console.log('图片绘制位置', this.imageLeft, this.imageTop, '图片宽高', this.imageW, this.imageH, '鼠标画布坐标', this.mouseInCanvasX, this.mouseInCanvasY)

      // 清空画布
      this.ctx.clearRect(0, 0, this.canvasW, this.canvasH)
      // 绘制图片
      this.ctx.drawImage(this.image, this.imageLeft, this.imageTop, this.imageW, this.imageH)
    },

    /**
     * 缩放图片
     *
     * @param {*} flag 缩放标识(为真则放大；为假则缩小)
     * @param {boolean} [isClick=false] 是否通过点击缩放
     */
    handleScale (flag, isClick = false) {
      if (!this.image) {
        this.$message({
          type: 'warning', // 类型
          msg: '请先选择图片！', // 提示信息
          center: true // 文字居中
        })
        return
      }

      const { scaleStep, minScale, maxScale } = this

      // 判断是否通过点击按钮缩放
      if (isClick) {
        // 修改放大中心为画布正中心（修改鼠标位置）
        this.mouseInCanvasX = this.canvasW / 2
        this.mouseInCanvasY = this.canvasH / 2
      }

      // 判断缩放标识
      if (flag) {
        console.log('放大图片...')
        this.canvas_box.style.cursor = 'zoom-in'

        // 修改缩放比例
        this.scale += scaleStep
        this.scale = this.scale >= maxScale ? maxScale : this.scale

        // 计算偏移量
        this.imageLeft = (this.imageLeft - this.mouseInCanvasX) * this.scale / this.oldScale + this.mouseInCanvasX
        this.imageTop = (this.imageTop - this.mouseInCanvasY) * this.scale / this.oldScale + this.mouseInCanvasY

        // 保存缩放比例
        this.oldScale = this.scale

        if (this.scale >= maxScale) {
          this.$message({
            type: 'warning', // 类型
            msg: '已到达最大放大限制了！', // 提示信息
            center: true // 文字居中
          })
          return
        }
      } else {
        console.log('缩小图片...')
        this.canvas_box.style.cursor = 'zoom-out'

        this.scale -= scaleStep
        this.scale = this.scale <= minScale ? minScale : this.scale

        // 计算偏移量
        this.imageLeft = (this.imageLeft - this.mouseInCanvasX) * this.scale / this.oldScale + this.mouseInCanvasX
        this.imageTop = (this.imageTop - this.mouseInCanvasY) * this.scale / this.oldScale + this.mouseInCanvasY

        // 保存缩放比例
        this.oldScale = this.scale

        if (this.scale <= minScale) {
          this.$message({
            type: 'warning', // 类型
            msg: '已到达最小缩小限制了！', // 提示信息
            center: true // 文字居中
          })
          return
        }
      }

      this.drawImage()
    },

    // 窗口转画布位置坐标
    windowToCanvasPlace (clientX, clientY) {
      const { top, left } = this.canvas.getBoundingClientRect()
      return {
        x: Math.round(clientX - left),
        y: Math.round(clientY - top)
      }
    },

    /**
     * 是否指向图片身上
     *
     * @param {Number} leftTopX 图片左上角坐标
     * @param {Number} leftTopY
     * @param {Number} imgW 图片宽高
     * @param {Number} imgH
     * @param {Number} x 鼠标坐标
     * @param {Number} y
     * @return {Boolean}
     */
    isPointImg (leftTopX, leftTopY, imgW, imgH, x, y) {
      /**
       * 判断是否处于矩形框内
       * 根据当前计算出的 x，y 坐标，判断是否小于 矩形的x，y 坐标，
       * 并且判断是否大于矩形 (x + width) 与 (y + height) 的右下角坐标
      */
      return x >= leftTopX && x <= (leftTopX + imgW) && y >= leftTopY && y <= (leftTopY + imgH)
    },

    // 鼠标按下事件
    handleMousedown (ev) {
      ev.preventDefault()
      console.log('鼠标按下...')

      // 获取鼠标x坐标和y坐标
      const { x, y } = this.windowToCanvasPlace(ev.clientX, ev.clientY)
      console.log('鼠标画布坐标', x, y)

      console.log('是否指向图片身上', this.isPointImg(this.imageLeft, this.imageTop, this.imageW, this.imageH, x, y))
      // 是否指向图片身上
      if (!this.isPointImg(this.imageLeft, this.imageTop, this.imageW, this.imageH, x, y)) return

      // 判断按下了鼠标的那个键
      if (ev.button === 0) {
        console.log('点击鼠标左键，拖拽图片')
        this.canvas_box.style.cursor = 'grab'
        this.isDragImg = true

        // 计算偏移量
        this.imgOffsetX = x - this.imageLeft
        this.imgOffsetY = y - this.imageTop
        console.log('鼠标相对于图片的偏移量', this.imgOffsetX, this.imgOffsetY)
      } else if (ev.button === 1) {
        console.log('点击鼠标滚轮')
      } else if (ev.button === 2) {
        console.log('点击鼠标右键，')
      }
    },

    // 鼠标移动
    handleMousemove (ev) {
      ev.preventDefault()
      if (!this.image) return

      const { x, y } = this.windowToCanvasPlace(ev.clientX, ev.clientY)

      // 记录鼠标在画布中的坐标
      this.mouseInCanvasX = x
      this.mouseInCanvasY = y

      if (this.isDragImg) {
        console.log('拖拽图片')
        this.canvas_box.style.cursor = 'grab'
        // 清空裁切图片信息数据
        this.clipImgInfo = null

        // 计算图片绘制位置 鼠标坐标 - 偏移量
        this.imageLeft = x - this.imgOffsetX
        this.imageTop = y - this.imgOffsetY

        // 绘制图片
        this.drawImage()
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
      this.canvas_box.style.cursor = 'auto'
    },

    // 鼠标滚轮事件
    handleMousewheel (ev) {
      ev.preventDefault()
      /**
       * 如图所示，
       * M(mouseX, mouseY)为：鼠标焦点位置，(已知量)
       * A(x0, y0)点为：地图缩放前的绘图起始点，(已知量)
       * A1(x1, y1)点为：地图缩放后的绘图起始点，
       * 因缩放前后M点需保持不变，
       * 故根据M点对地图起始点的坐标进行换算，
       * 设地图缩放前的比例为 scale0 ，缩放后的比例为 scale1 ，则有
       *
       * mouseX = (x0 - mouseX) / scale0 = (x1 - mouseX) / scale1
       * x1 = (x0 - mouseX) / scale0 * scale1 + mouseX
       *
       * mouseY = (y0 - mouseY) / scale0 = (y1 - mouseY) / scale1
       * y1 = (y0 - mouseY) / scale0 * scale1 + mouseY
      */
      if (!this.image) return

      // 判断是否支持e.detail 支持的话说明是火狐
      const delta = ev.wheelDelta ? ev.wheelDelta : -ev.datail

      if (delta > 0) {
        // 放大图片
        this.handleScale(1)
      } else {
        // 缩小图片
        this.handleScale(0)
      }
    },

    // 预览图片
    handlePreviewImage () {
      if (!this.clipImgInfo) {
        this.$message({
          type: 'warning', // 类型
          msg: '请先裁切图片！', // 提示信息
          center: true // 文字居中
        })
        return
      }

      this.$previewImage({
        urlList: [this.clipImgInfo]
      })
    },

    // 保存图片
    handleSaveImage () {
      if (!this.clipImgInfo) {
        this.$message({
          type: 'warning', // 类型
          msg: '请先裁切图片！', // 提示信息
          center: true // 文字居中
        })
        return
      }

      downloadFile(this.clipImgInfo)
      this.$message({
        type: 'success', // 类型
        msg: '图片下载成功！', // 提示信息
        center: true // 文字居中
      })
    },

    // 裁切图片
    handleClipImage () {
      if (!this.image) {
        this.$message({
          type: 'warning', // 类型
          msg: '请先选择图片！', // 提示信息
          center: true // 文字居中
        })
        return
      }

      // 获取遮罩层区域的像素信息
      const imageData = this.ctx.getImageData(this.maskLeft, this.maskTop, this.maskW, this.maskH)

      // 创建新的画布
      const canvas2 = document.createElement('canvas')
      const ctx2 = canvas2.getContext('2d')
      canvas2.width = this.maskW
      canvas2.height = this.maskH

      // 把像素信息放置到画布中
      ctx2.putImageData(imageData, 0, 0, 0, 0, this.maskW, this.maskH)

      // 把画布中的内容转换成base64图片
      const base64Img = canvas2.toDataURL('image/png')
      // console.log('转换成base64图片 ==> ', base64Img)
      this.clipImgInfo = base64Img

      // 触发父组件方法，返回裁切后的图片信息
      this.$emit('saveImage', base64Img)

      this.$message({
        type: 'success', // 类型
        msg: '图片裁切成功！', // 提示信息
        center: true // 文字居中
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.clipImage {
  width: 405px;
  padding: 10px;
  border: 1px solid #ddd;

  .canvas_box {
    position: relative;
    margin-bottom: 10px;
    // border: 1px dotted #ccc;
    border: 1px dotted #409eff;
    overflow: hidden;

    canvas {
      position: absolute;
      top: 0;
      left: 0;
      display: block;
    }

    .tip_box {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      h2 {
        font-size: 20px;
        color: #ccc;
      }
    }

    .mask {
      position: absolute;
      top: 0;
      left: 0;
      // background: rgba(0, 0, 0, 0.3);
      border: 2px dotted #409eff;
    }
  }

  .file {
    display: none;
  }

  .operate_area_box {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.previewFile {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;

  img {
    height: 200px;
    width: auto;
  }
}
</style>
