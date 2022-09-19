import PopComponent from './Pop.vue'

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
      const Ctor = Vue.extend(PopComponent)
      // 创建实例，并实例挂 (instance 实例)
      const instance = new Ctor({
        propsData: options
      }).$mount(document.createElement('div'))

      return instance
    }

    // 在vue原型，添加实例方法
    // 气泡弹框 (vue.$pop('我是标题', [shake]))
    Vue.prototype.$pop = (options) => {
      createInstance(options)
    }
  }
}
