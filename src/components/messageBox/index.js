import MessageBox from './MessageBox.vue'

export default {
  // 绑定 install 方法
  install (Vue) {
    /**
     * 创建实例
     *
     * @param {Object} options 配置对象
     * @return {*} 实例
     */
    function createInstance (options) {
      // 创建构造器
      const Ctor = Vue.extend(MessageBox)
      // 创建实例，并实例挂 (instance 实例)
      const instance = new Ctor({
        propsData: options
      }).$mount(document.createElement('div'))

      return instance
    }

    // 在vue原型，添加实例方法
    // confirm 确认对话框
    Vue.prototype.$confirm = function (options) {
      createInstance(options)
    }
    // alert 警示对话框
    Vue.prototype.$alert = function (options) {
      // 添加type属性
      createInstance(Object.assign(options, {
        type: 'alert'
      }))
    }
  }
}
