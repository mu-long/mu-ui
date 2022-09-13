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

  pages: {
    index: {
      // 项目入口文件
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  // 扩展webpack配置
  // 高版本js语法转为低版本
  chainWebpack: (config) => {
    config.module
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
