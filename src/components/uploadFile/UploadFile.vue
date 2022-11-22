<template>
  <div class="uploadFile">
    <!-- 多文件上传2 -->
    <section class="upload_box item">
      <!-- 方案2: 限制文件上传的格式 -->
      <input
        type="file"
        name="file"
        :multiple="multiple"
        :accept="accept"
        class="upload_inp"
        ref="upload_inp"
        @change="handlSelectFileChange($event)"
      >

      <!-- 上传按钮 -->
      <div class="upload_btn_box">
        <Mu-Button
          class="upload_button"
          type='primary'
          :disabled='isDisable'
          @click="selectFiles($event)"
        >选择文件</Mu-Button>

        <Mu-Button
          class="upload_button"
          type='success'
          icon='m-icon-loading'
          :disabled='isDisable'
          :isShowIcon='isDisable'
          :isRotateIcon='isDisable'
          @click="handleUploadBtn()"
        >上传到服务器</Mu-Button>
      </div>

      <!-- 拖拽区域 -->
      <div
        class="upload_drag_box"
        ref="drag_box"
        v-show="drag"
        @dragenter="handleDragEnter"
        @dragleave="handleDragLeave"
        @dragover.prevent="handleDragOver"
        @drop.prevent="handleDrop($event)"
      >
        <i class="drag_icon m-icon-cloud-upload"></i>
        <p>
          <span>或将文件拖到此处</span>
        </p>
        <div
          class="upload_mask"
          :class="isDisable ? 'is-disabled' : ''"
        >
          <p
            class="tip"
            ref="drag_tip"
          >正在上传中，请稍等...</p>
        </div>
      </div>

      <!-- 提示信息 -->
      <template v-if="$slots.tipInfo">
        <div
          class="upload_tip"
          v-show="filesArr.length === 0"
        >
          <!-- 支持slot插槽 -->
          <slot name="tipInfo"></slot>
        </div>
      </template>

      <!-- 上传列表 -->
      <div
        class="upload_list_box"
        v-show="filesArr.length > 0"
      >
        <!-- 标题 -->
        <div class="title">
          <p>上传列表</p>
          <a
            href="javascript:;"
            @click="clearUploadList"
          >清空列表</a>
        </div>

        <!-- 列表 -->
        <ul class="upload_list_info">
          <transition-group name="animation_fade">
            <li
              class="file_item"
              v-for="(item, index) in filesArr"
              :key="item.key"
            >
              <!-- 进度条 -->
              <div
                class="upload_progress"
                :class="{
                  'start': item.uploadState === 'start',
                  'success': item.uploadState === 'success',
                  'error': item.uploadState === 'error',
                }"
                v-show="item.uploadState !== ''"
              >
                <div
                  class="progress"
                  :style="{'width': item.progress_num + '%'}"
                ></div>
              </div>

              <!-- 删除按钮 -->
              <div
                class="del_btn del_file"
                @click="handleRemoveFile(item)"
              >
                <i class="m-icon-quxiao"></i>
              </div>

              <!-- 文件信息 -->
              <div class="file_info">
                <div class="left">
                  <img
                    v-if="item.qualifyInfo.msg === '图片'"
                    class="thumbnail_img"
                    :src="item.fileSrc"
                  >
                  <video
                    v-else-if="item.qualifyInfo.msg === '视频'"
                    class="thumbnail_video"
                    :src="item.fileSrc"
                  ></video>

                  <!-- 遮罩 -->
                  <div class="mask">
                    <div class="mask_btn">
                      <!-- 预览 下载 删除 -->
                      <div
                        class="icon preview"
                        @click="handlePreviewFile(item)"
                      >预览</div>
                      <div
                        class="icon download"
                        @click="downloadFile(item.fileSrc)"
                      >下载</div>
                      <div
                        class="icon delete del_file"
                        @click="handleRemoveFile(item)"
                      >删除</div>
                    </div>
                  </div>
                </div>

                <div class="right">
                  <div class="file_name">文件{{ index + 1 }}：<p>{{ item.fileName }}</p>
                  </div>
                  <!-- 上传进度 -->
                  <div
                    class="progress_num_box"
                    :class="{
                      'start': item.uploadState === 'start',
                      'success': item.uploadState === 'success',
                      'error': item.uploadState === 'error',
                    }"
                    v-show="item.uploadState !== ''"
                  >
                    上传进度：<em class="progress_num">{{ item.progress_num.toFixed(2) + '%' }}</em>
                  </div>
                  <a
                    v-show="item.uploadState === 'success'"
                    class="server_url"
                    :class="{
                      'success': item.uploadState === 'success',
                    }"
                    :href="item.servicePath"
                    target="_blank"
                  >在线链接</a>
                </div>
              </div>
            </li>
          </transition-group>
        </ul>
      </div>
    </section>

    <!-- 文件预览 -->
    <div
      class="preview_file"
      v-show="isPreviewFile"
    >
      <Mu-Dialog
        width='80vw'
        top='5vh'
        :isShow.sync='isPreviewFile'
      >
        <template v-slot:title>
          <span>文件预览：</span>
        </template>

        <template v-slot:body>
          <div class="previewFile">
            <img
              v-if="previewFileType === '图片'"
              :src="previewFileSrc"
            >
            <video
              v-else-if="previewFileType === '视频'"
              :src="previewFileSrc"
              controls
            ></video>
          </div>
        </template>

        <template v-slot:footer>
        </template>
      </Mu-Dialog>
    </div>
  </div>
</template>

<script>
import {
  filterFiles,
  changeBuffer,
  downloadFile
} from '@/utils/index'
import { myAxios, instance } from '@/config/myAxios'

export default {
  name: 'Mu-UploadFile',
  props: {
    // 文件上传的地址
    uploadAddress: {
      required: true, // 必填项
      type: String,
      default: ''
    },
    // 文件类型
    accept: {
      type: String,
      default: '.png,.jpg,.jpeg,.mp4'
    },
    // 上传的文件字段名
    fieldName: {
      type: String,
      default: 'filename'
    },
    // 是否启用拖拽上传
    drag: {
      type: Boolean,
      default: false
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    },
    // 是否支持多选文件
    multiple: {
      type: Boolean,
      default: false
    },
    // 最多允许上传个数
    limit: {
      type: Number,
      default: 1
    },
    // 限制视频文件大小 (最大 1GB)
    videoMaxSize: {
      type: Number,
      default: 1 * 1024 * 1024 * 1024
    },
    // 限制图片文件大小 (最大 2MB)
    imgMaxSize: {
      type: Number,
      default: 2 * 1024 * 1024
    },
    // 启用切片上传的最小文件大小 (>= 100MB)
    sliceUploadMinFileSize: {
      type: Number,
      default: 100 * 1024 * 1024
    }
  },
  data () {
    return {
      filesArr: [], // 文件数组
      uploaded_number: 0, // 文件已经上传的数量
      successList: [], // 上传成功列表
      isDisable: false, // 是否禁用
      isPreviewFile: false, // 是否预览文件
      previewFileType: false, // 预览文件类型
      previewFileSrc: '', // 预览文件地址
      downloadFile
    }
  },
  watch: {
    // 判断是否禁用组件上传功能
    disabled: {
      // 2. handler 属性是固定写法。当 disabled 变化时，调用 handler
      handler (newVal, oldVal) {
        // console.log('newVal, oldVal ==>', newVal, oldVal)
        this.isDisable = newVal
        if (this.disabled) {
          setTimeout(() => {
            this.$refs.drag_tip.innerHTML = '上传功能已经被禁用...'
          }, 500)
        }
      },
      // 3. 表示组件加载完毕，立即调用一次当前的 watch 侦听器
      immediate: true
    }
  },
  created () {
    // 传递文件上传的地址
    myAxios(this.uploadAddress)
  },
  methods: {
    /**
     * 改变禁用状态
     *
     * @param {Boolean} flag 标示; 为true表示禁用; 为false表示取消禁用
     */
    changeDisable (flag) {
      this.isDisable = flag
      console.log('flag ==> ', flag)
      // if (this.isDisable === true) {
      //   this.$refs.drag_tip.innerHTML = '正在上传中，请稍等...'
      // }
    },

    // 选择文件
    selectFiles (e) {
      // console.log('e ==> ', e)
      // console.log('this ==> ', this.$el)
      // 验证是否处于可操作状态
      // 如果正在上传中，取消点击事件
      if (this.isDisable) return

      // 触发input文件输入框 点击事件
      this.$refs.upload_inp.click()
    },

    // 监听用户选择文件的操作
    async handlSelectFileChange (e) {
      // console.log('e.target.value ==> ', e.target.value)
      // console.log('this.$refs.upload_inp.files ==> ', this.$refs.upload_inp.files)
      const files = Array.from(this.$refs.upload_inp.files)

      if (files.length === 0) return

      if (files.length > this.limit) {
        this.$message({
          type: 'warning', // 类型
          msg: `最多允许上传${this.limit}个文件！`, // 提示信息
          center: true // 文字居中
        })
        return
      }

      // 处理过滤文件
      this.filesArr = await filterFiles(files, this.accept, this.videoMaxSize, this.imgMaxSize)

      // 清空value，防止下次无法选中此文件
      e.target.value = ''
    },

    // 处理文件预览
    handlePreviewFile (item) {
      this.isPreviewFile = true
      this.previewFileType = item.qualifyInfo.msg
      this.previewFileSrc = item.fileSrc
    },

    // 移除按钮的点击处理
    handleRemoveFile (item) {
      console.log('移除 item ==> ', item)
      this.filesArr = this.filesArr.filter(i => i.key !== item.key)
    },

    // 清空上传列表
    clearUploadList () {
      this.filesArr = []
    },

    // 拖拽事件
    // 进入
    handleDragEnter () {
      // 验证是否处于可操作状态
      if (this.isDisable) return
      console.log('进入')

      this.$refs.drag_box.style.border = '2px solid #409eff'
    },
    // 离开
    handleDragLeave () {
      // 验证是否处于可操作状态
      if (this.isDisable) return
      console.log('离开')

      this.$refs.drag_box.style.border = '1px dashed #ccc'
    },
    // 移动
    handleDragOver () {
      // 验证是否处于可操作状态
      if (this.isDisable) return
      console.log('移动')

      this.$refs.drag_box.style.border = '2px solid #409eff'
    },
    // 放置
    async handleDrop (e) {
      // 验证是否处于可操作状态
      // 如果正在上传中，取消
      if (this.isDisable) return
      console.log('放置')
      console.log('e.dataTransfer.files ==> ', e.dataTransfer.files)

      this.$refs.drag_box.style.border = '1px dashed #ccc'

      const files = Array.from(e.dataTransfer.files)

      if (files.length === 0) return

      if (files.length > this.limit) {
        this.$message({
          type: 'warning', // 类型
          msg: `最多允许上传${this.limit}个文件！`, // 提示信息
          center: true // 文字居中
        })
        return
      }

      // 处理过滤文件
      this.filesArr = await filterFiles(files, this.accept, this.videoMaxSize, this.imgMaxSize)

      // 清空value，防止下次无法选中此文件
      e.target.value = ''
    },

    // 点击上传按钮
    handleUploadBtn () {
      console.log('点击上传按钮...')
      // 验证是否处于可操作状态
      // 如果正在上传中，取消点击事件
      if (this.isDisable) return

      if (this.filesArr.length === 0) {
        this.$message({
          type: 'warning', // 类型
          msg: '请您先选择上传的文件！', // 提示信息
          center: true // 文字居中
        })
        return
      }

      // 改变禁用状态
      this.changeDisable(true)

      this.uploadFiles()
    },

    // 上传文件到服务器
    uploadFiles () {
      // 循环发送请求
      let promiseAllFiles = this.filesArr.map(async item => {
        // 过滤已经上传过的文件,防止用户再次上传已完成项 (这样做可能不好!还好map没有改变原数组,返回的数据只是为了监听Promise.all)
        if (item.isUpload === true) {
          console.log(`文件${item.fileName}已经存在,无需上传`)
          return `文件${item.fileName}已经存在,无需上传`
        }

        // 获取文件MD5 与 后缀
        const { md5, ext } = await changeBuffer(item.file)

        // 判断文件是否上传
        await instance
          .get('/upload_file', {
            params: { filename: item.serviceFileName }
          })
          .then(res => {
            if (res.code === 200) {
              // 如果文件已经上传过,告诉Promise 成功
              Promise.resolve(res.msg)
              // 记录上传状态
              item.isUpload = true
              item.uploadState = 'success'
              item.progress_num = 100
              item.servicePath = res.servicePath
              // 上传计数
              this.uploaded_number += 1
              this.successList.push({
                fileName: item.fileName,
                servicePath: item.servicePath
              })
              console.log('此文件已经上传...')

              console.log('this.uploaded_number ==> ', this.uploaded_number, this.filesArr.length)
              if (this.uploaded_number === this.filesArr.length) {
                // 改变禁用状态
                this.changeDisable(false)
              }
            } else if (res.code === 400) {
              console.log('此文件没有上传...')
            }
          })
          .catch(err => {
            Promise.reject(err)
            console.log('err ==> ', err)

            this.$message({
              type: 'error', // 类型
              msg: `服务器错误!${err}`, // 提示信息
              center: true // 文字居中
            })
          })

        // 如果文件已经上传过 结束上传
        if (item.isUpload === true) return `文件${item.fileName}已经存在,无需上传`

        // 根据文件大小判断如何上传,上传的方式
        // 如果文件大小 > 100MB
        if (item.fileSize > this.sliceUploadMinFileSize) {
          // 切片上传
          console.log('切片上传...')
          item.uploadState = 'start'

          return new Promise((resolve, reject) => {
            // 切片已经上传列表
            let uploadAlready = []

            // 获取已经上传的切片信息
            uploadAlready = instance
              .get('/upload_already', {
                params: { md5 }
              })
              .then(res => {
                if (res.code === 200) {
                  console.log('已经上传的切片信息 ==> ', res.fileList)
                }
                return res.fileList
              })
              .catch(err => {
                console.log('err ==> ', err)
                return []
              })

            // 实现文件切片处理 (固定切片大小与数量)
            // 单个切片最大 1M
            let maxSize = 1 * 1024 * 1024
            // 切片最大数量 (向上取整)
            let maxCount = Math.ceil(item.file.size / maxSize)

            // 如果切片最大数量 > 100
            if (maxCount > 100) {
              maxCount = 100
              maxSize = Math.ceil(item.file.size / maxCount)
            }
            console.log('单个切片最大 ==> ', maxSize)
            console.log('切片最大数量 ==> ', maxCount)

            let index = 0
            // 切片块
            const chunks = []
            for (; index < maxCount; index++) {
              chunks.push({
                // 切割文件
                file: item.file.slice(index * maxSize, (index + 1) * maxSize),
                // md5a6b9_01.mp4 md5a6b9_02.mp4
                filename: `${md5}_${index + 1}.${ext}`
              })
            }
            console.log('切割文件结果 ==> ', chunks)

            // 已经上传的切片数量
            let uploadCount = 0
            console.log('已经上传的切片数量 ==> ', uploadCount)

            // 通知服务器文件上传成功，合并切片为完整的文件
            const complete = async () => {
              uploadCount++
              console.log('uploadCount , maxCount ==>', uploadCount, maxCount)

              // 监测每一个上传进度
              // 设置进度条进度
              item.progress_num = (uploadCount / maxCount) * 100

              // 判断切片是否全部上传
              if (uploadCount < maxCount) return

              item.progress_num = 100

              // 通知服务器文件上传成功，合并切片为完整的文件
              await instance
                .post(
                  '/upload_merge',
                  { md5, maxCount },
                  {
                    headers: {
                      'Content-Type': 'application/x-www-form-urlencoded'
                    }
                  }
                )
                .then(res => {
                  if (res.code === 200) {
                    item.uploadState = 'success'
                    item.servicePath = res.servicePath
                    this.successList.push({
                      fileName: item.fileName,
                      servicePath: item.servicePath
                    })
                    resolve(res.msg)
                  } else {
                    reject(res.msg)
                  }
                })
                .catch(err => {
                  item.uploadState = 'error'
                  console.log(`文件合并失败，请稍后再试！ err ==> ${err}`)
                  if (err) {
                    reject(new Error(`文件合并失败，请稍后再试！ err ==> ${err}`))
                  }
                })
                .finally(() => {
                  // 不论成功与失败都会走这里
                  this.uploaded_number += 1
                  console.log('this.uploaded_number ==> ', this.uploaded_number, this.filesArr.length)
                })
            }

            // 把每一个切片都上传到服务器
            chunks.forEach(async item2 => {
              // 已经上传过的切片无需上传
              if (uploadAlready.length > 0 && uploadAlready.includes(item2.filename)) {
                // 通知服务器文件切片上传成功
                complete()
                return
              }

              // 将文件传给服务器 FormData / base64
              const formData = new FormData()
              formData.append('file', item2.file)
              formData.append(this.fieldName, item2.filename)

              instance
                .post('/upload_chunk', formData)
                .then(res => {
                  if (res.code === 200) {
                    // 通知服务器文件切片上传成功
                    complete()
                    console.log(`切片${item2.filename}上传成功...`)
                  } else {
                    reject(res.msg)
                  }
                })
                .catch(err => {
                  console.log(`文件上传失败，请稍后再试！${err}`)
                  reject(new Error(`文件上传失败，请稍后再试！${err}`))
                })
            })
          })
        } else {
          // 普通上传
          console.log('普通上传...')
          item.uploadState = 'start'

          // 将文件传给服务器 FormData / base64
          const formData = new FormData()
          formData.append('file', item.file)
          formData.append(this.fieldName, item.serviceFileName)
          console.log('formData ==> ', formData)
          console.log('item.file ==> ', item.file)

          // 返回上传请求，方便Promise监听
          return instance
            .post('/upload_single_name', formData, {
              // axios 监听上传进度
              onUploadProgress (e) {
                // console.log('e ==> ', e)
                // loaded 已经上传, total 上传总数
                const { loaded, total } = e
                // 监测每一个上传进度
                // 设置进度条进度
                item.progress_num = (loaded / total) * 100
              }
            })
            .then(res => {
              if (res.code === 200) {
                // 记录上传状态
                item.isUpload = true
                item.uploadState = 'success'
                // 设置进度条进度
                item.progress_num = 100
                item.servicePath = res.servicePath
                this.successList.push({
                  fileName: item.fileName,
                  servicePath: item.servicePath
                })
              } else if (res.code === 400) {
                console.log('400 ==> ', res.msg)
                return Promise.reject(res.msg)
              } else {
                return Promise.reject(new Error())
              }
            })
            .catch(err => {
              item.uploadState = 'error'
              console.log('文件上传失败，请稍后再试！ err ==> ', err)
              return Promise.reject(err)
            })
            .finally(() => {
              // 不论成功与失败都会走这里
              // 上传计数
              this.uploaded_number += 1
              console.log('this.uploaded_number ==> ', this.uploaded_number, this.filesArr.length)
            })
        }
      })

      console.log('等待所有文件上传结果 promiseAllFiles ==> ', promiseAllFiles)

      // 等待所有文件上传结果
      Promise.all(promiseAllFiles)
        .then(() => {
          this.$message({
            type: 'success', // 类型
            msg: '文件已全部上传成功!', // 提示信息
            center: true // 文字居中
          })
        })
        .catch(() => {
          this.$message({
            type: 'error', // 类型
            msg: '很遗憾，上传过程中遇到问题！请稍后再试...', // 提示信息
            center: true // 文字居中
          })
        })
        .finally(() => {
          console.log('Promise.all this.filesArr ==> ', this.filesArr)
          console.log('Promise.all promiseAllFiles ==> ', promiseAllFiles)
          console.log('上传成功列表 this.successList ==> ', this.successList)

          // 触发父组件方法，返回上传成功列表信息
          this.$emit('successListInfo', JSON.parse(JSON.stringify(this.successList)))
          // 恢复初始值
          promiseAllFiles = []
          this.uploaded_number = 0
          // 改变禁用状态
          this.changeDisable(false)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
// 动画 逐渐消失
.animation_fade-enter,
.animation_fade-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.animation_fade-enter-active,
.animation_fade-leave-active {
  transition: all 0.8s;
}
/*
  下面的 .v-move 和 .v-leave-active 配合使用，能够实现列表后续的元素，渐渐地漂上来的效果
*/
.animation_fade-move {
  transition: all 0.8s ease;
}
.animation_fade-leave-active {
  position: absolute;
}

.previewFile {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;

  img,
  video {
    height: 100vh;
    min-height: 500px;
    width: auto;
  }
}

.uploadFile {
  a {
    text-decoration: none;
    color: #409eff;
  }

  .upload_box {
    margin: 15px;
    padding: 10px;
    width: 300px;
    min-height: 200px;
    max-height: 368px;
    overflow-y: auto;
    border: 1px solid #ccc;
    position: relative;
  }

  .upload_inp {
    display: none;
  }

  .upload_btn_box {
    margin: 15px 0;
    text-align: center;
  }

  .is-disabled {
    cursor: no-drop;
    opacity: 0.5;
  }

  .upload_mask,
  .upload_drag_box .upload_mask {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 1;
    background: rgba(0, 0, 0, 0.7);

    .tip {
      width: 70%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 18px;
      color: #fff;
    }
  }

  .upload_tip {
    margin: 10px 0;
    font-size: 12px;
    color: #333;
  }

  .upload_thumbnail {
    padding: 10px;

    img {
      width: 100px;
      border: 3px solid #ccc;
    }
  }

  .upload_drag_box {
    position: relative;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px dashed #ccc;
    &:hover {
      border-color: #409eff;
    }

    .upload_mask.is-disabled {
      display: block;
    }

    .drag_icon {
      font-size: 100px;
      color: #409eff;
    }
  }

  .upload_list_box {
    .title {
      position: relative;
      margin-top: 10px;
      border-bottom: 1px dashed #ccc;
      p {
        padding: 5px;
        text-align: center;
        font-size: 16px;
        font-weight: 500;
      }
      a {
        position: absolute;
        right: 5px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }

  .file_item {
    position: relative;
    width: 100%;
    margin: 15px auto;
    padding: 8px 15px;
    border-radius: 5px;
    border: 1px solid #ccc;

    &:last-child {
      margin-bottom: 0;
    }

    // 进度条
    .upload_progress {
      position: relative;
      margin-bottom: 10px;
      width: 200px;
      height: 3px;
      border-radius: 3px;
      background: rgb(206, 195, 195);
      overflow: hidden;
    }

    .upload_progress.start .progress {
      background-color: hotpink;
    }
    .upload_progress.success .progress {
      background-color: green;
      width: 100%;
    }
    .upload_progress.error .progress {
      background-color: red;
    }

    .progress {
      position: absolute;
      /* width: 30%; */
      height: 3px;
      border-radius: 3px;
      background-color: green;
      transition: width 0.3s;
    }

    // 上传进度
    .progress_num {
      color: #67c23a;
    }
    .progress_num_box.start .progress_num {
      color: hotpink;
    }
    .progress_num_box.success .progress_num {
      color: #67c23a;
    }
    .progress_num_box.error .progress_num {
      color: red;
    }

    .server_url {
      display: none;
    }

    .server_url.success {
      display: block;
    }

    .del_btn {
      position: absolute;
      top: 8px;
      right: 8px;
      color: red;
      cursor: pointer;
    }
  }

  .file_info {
    display: flex;
    justify-content: space-around;
    align-items: center;

    .left {
      position: relative;
      width: 100px;
      height: 100px;
      border: 2px solid #eee;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;

      &:hover .mask {
        display: block;
      }

      img,
      video {
        width: 100px;
      }

      .mask {
        display: none;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);

        .mask_btn {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          font-size: 12px;
          color: #fff;

          .icon {
            cursor: pointer;
          }

          .icon:hover {
            color: #409eff;
          }
        }
      }
    }

    .right {
      margin-left: 10px;
      .file_name p {
        width: 110px;
        /* 超出隐藏 */
        overflow: hidden;
        /* 设置文本不换行 */
        white-space: nowrap;
        /* 设置文本省略号 */
        text-overflow: ellipsis;
      }

      div {
        margin-bottom: 10px;
      }
    }
  }
}
</style>
