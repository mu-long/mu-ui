/**
 * axios 请求的公共信息进行提取
 */
const axios = require('axios')
const qs = require('qs')

const instance = axios.create()

const myAxios = function (baseURL = 'http://127.0.0.1:3000') {
  // 配置请求根路径
  instance.defaults.baseURL = baseURL
}

// 配置默认 Content-Type
instance.defaults.headers['Content-Type'] = 'multipart/form-data'

// 转换请求 transformRequest 允许在将请求数据发送到服务器之前更改该请求数据
instance.defaults.transformRequest = (data, headers) => {
  const contentType = headers['Content-Type']
  if (contentType === 'application/x-www-form-urlencoded') {
    return qs.stringify(data)
  } else {
    return data
  }
}

// 响应拦截器
instance.interceptors.response.use(
  response => {
    return response.data
  },
  err => {
    return Promise.reject(new Error(err))
  }
)

export { myAxios, instance }
