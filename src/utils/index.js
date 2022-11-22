const SparkMD5 = require('spark-md5')

// 创建随机数
const createRandom = () => {
  const random = Math.random() * new Date()
  // .toString(16) 将数字转化为16进制
  return random.toString(16).replace('.', '')
}

/**
 * 检查文件是否符合要求
 *
 * @param {File} file 文件对象
 * @param {String} accept 文件类型
 * @param {Number} videoMaxSize 视频文件大小限制
 * @param {Number} imgMaxSize 图片文件大小限制
 * @return {Object} 文件符合要求返回文件类型; 文件不符合要求返回文件错误信息
 */
const checkFileQualifyInfo = (file, accept, videoMaxSize, imgMaxSize) => {
  // return new Promise((resolve, reject) => {
  accept = accept.replace(/\./g, '').replace(/,/g, '|')
  const fileFormatReg = new RegExp(accept, 'i')
  // 方案1: 限制文件上传的格式
  if (!fileFormatReg.test(file.type)) {
    return {
      code: 400,
      msg: '上传的文件格式不符合要求！'
    }
  }

  // 限制文件上传的大小
  if (file.type === 'video/mp4' && file.size > videoMaxSize) {
    return {
      code: 400,
      msg: '上传的视频文件大小不能超过2GB！'
    }
  }

  if (/png|jpg|jpeg/i.test(file.type) && file.size > imgMaxSize) {
    return {
      code: 400,
      msg: '上传的图片文件大小不能超过2MB！'
    }
  }

  // 判断是视频还是图片文件
  if (/mp4/i.test(file.type)) {
    // if (file.type === 'video/mp4') {
    // 视频文件
    return {
      code: 200,
      msg: '视频'
    }
  } else if (/png|jpg|jpeg/i.test(file.type)) {
    // 图片文件
    return {
      code: 200,
      msg: '图片'
    }
  }
  // })
}

/**
 * 处理过滤文件
 *
 * @param {Array} _files 需要过滤的文件数组
 * @param {String} accept 文件类型
 * @param {Number} videoMaxSize 限制视频文件最大 (默认 1GB, 单位: Byte 字节)
 * @param {Number} imgMaxSize 限制图片文件最大 (默认 2MB, 单位: Byte 字节)
 * @return {Promise} 处理过后的文件数组
 */
const filterFiles = async (
  _files,
  accept,
  videoMaxSize = 1 * 1024 * 1024 * 1024,
  imgMaxSize = 2 * 1024 * 1024
) => {
  // 利用 Promise.all 等待 重构集合
  _files = await Promise.all(
    // 重构集合的数据结构
    _files.map(async item => {
      // 获取文件MD5
      const { md5, ext } = await changeBuffer(item)
      const serviceFileName = `${md5}.${ext}`

      // 上传文件信息
      return Promise.resolve({
        // 唯一标识
        key: createRandom(),
        // 是否已经上传
        isUpload: false,
        // 上传的状态 (等待 await；加载中 loading；开始 start； 暂停 pause； 结束 end； 错误 error；成功 success；超时 timeout)
        uploadState: '',
        progress_num: 0, // 上传的进度
        file: item,
        fileName: item.name, // 文件名称
        fileType: item.type,
        fileSize: item.size,
        // 未上传时的预览路径
        fileSrc: URL.createObjectURL(item),
        serviceFileName, // 服务器文件名称
        servicePath: '', // 文件服务器路径
        // 合格信息
        qualifyInfo: checkFileQualifyInfo(item, accept, videoMaxSize, imgMaxSize)
      })
    })
  )
  console.log('重构集合 _files ==> ', _files)

  // 文件MD5名称
  const md5Arr = []
  // 重构数组结束 过滤文件
  for (let i = 0; i < _files.length; i++) {
    const item = _files[i]
    // 如果文件不合格
    if (item.qualifyInfo.code === 400) {
      // 过滤不符合要求的文件
      _files.splice(i, 1)
      i--
      // 打印其原因
      console.log(item.qualifyInfo.msg)
      // 弹框警告
      window.vue.$message({
        type: 'warning', // 类型
        msg: item.qualifyInfo.msg, // 提示信息
        center: true // 文字居中
      })
      // 阻止当前轮循环继续往下执行，并且进入下一轮循环
      continue
    }

    if (md5Arr.includes(item.serviceFileName)) {
      // 过滤名称不同但内容相同的文件
      _files.splice(i, 1)
      i--
      // 阻止当前轮循环继续往下执行，并且进入下一轮循环
      continue
    }
    md5Arr.push(item.serviceFileName)
  }
  console.log('过滤文件 _files ==> ', _files)

  return Promise.resolve(_files)
}

/**
 * 文件转换为Buffer格式
 *
 * @param {File} file 文件对象
 * @return {Promise}
 */
const changeBuffer = file => {
  return new Promise(resolve => {
    const fileReader = new FileReader()
    // 转换为Buffer格式
    fileReader.readAsArrayBuffer(file)
    fileReader.onload = e => {
      const buffer = e.target.result
      console.log('buffer ==> ', buffer)

      // 根据文件内容,生成唯一MD5名字 (需下载插件 spark-md5)
      const sparkMD5 = new SparkMD5.ArrayBuffer()
      sparkMD5.append(buffer)
      const md5 = sparkMD5.end()

      // 文件扩展后缀 png
      const ext = /\.([0-9a-zA-Z]+)$/.exec(file.name)[1]

      resolve({
        buffer,
        md5,
        ext,
        filename: `${md5}.${ext}`
      })
    }
  })
}

/**
 * 下载文件
 *
 * @param {string} fileUrl 文件的下载地址
 * @param {string} [fileName=''] 下载的文件名称
 */
const downloadFile = (fileUrl, fileName = '') => {
  const eleLink = document.createElement('a')
  eleLink.style.display = 'none'
  eleLink.href = fileUrl
  eleLink.download = fileName
  // 触发点击事件
  eleLink.click()
}

export { createRandom, checkFileQualifyInfo, filterFiles, changeBuffer, downloadFile }
