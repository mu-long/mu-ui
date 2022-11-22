const path = require('path')
const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

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

  // configureWebpack: config => {
  //   const plugins = []
  //   plugins.push(new NodePolyfillPlugin())
  // },

  // 或者
  // configureWebpack: {
  //   plugins: [new NodePolyfillPlugin()]
  // },

  // 配置 Webpack
  configureWebpack: {
    // [resolve 解决]
    // resolve: {
    //   // [fallback 回退] 如果确认需要node polyfill，设置 resolve.fallback 安装对应的依赖!!!
    //   fallback: {
    //     // crypto: require.resolve('crypto-browserify'),
    //     path: require.resolve('path-browserify'),
    //     url: require.resolve('url'),
    //     buffer: require.resolve('buffer/'),
    //     util: require.resolve('util/'),
    //     stream: require.resolve('stream-browserify/'),
    //     vm: require.resolve('vm-browserify')
    //   },
    //   // [alias 别名] 如果确认不需要node polyfill，设置 resolve.alias 设置为 false
    //   alias: {
    //     crypto: false
    //   }
    // },
    plugins: [new NodePolyfillPlugin()]
  },

  // 扩展webpack配置
  chainWebpack: config => {
    config.module
      // 高版本js语法转为低版本
      .rule('js')
      .include.add(path.resolve(__dirname, './src/components'))
      .end()
      .use('babel')
      .loader('babel-loader')
      .tap(options => {
        return options
      })
  }
}
