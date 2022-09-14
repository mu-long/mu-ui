const path = require('path')
const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })

module.exports = {
  pluginOptions: {
    defineConfig: defineConfig({
      transpileDependencies: true
    })
  },

  // 静态资源路径
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',

  // 放置生成的静态资源 (js、css、img、fonts) 的目录
  // assetsDir: 'assets',

  indexPath: 'index.html',

  productionSourceMap: false, // 取消.map文件的打包，加快打包速度

  pages: {
    index: {
      // 项目入口文件
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },

  // 扩展webpack配置
  chainWebpack: (config) => {
    config.module
      // 高版本js语法转为低版本
      .rule('js')
      .include.add(path.resolve(__dirname, './src/components'))
      .end()
      .use('babel')
      .loader('babel-loader')
      .tap((options) => {
        return options
      })
  }
}
