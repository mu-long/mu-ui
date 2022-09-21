// import Dialog from './Dialog.vue'

// export default {
//   Dialog,
//   // 绑定 install 方法
//   install (Vue) {
//     /**
//      * 创建实例
//      *
//      * @param {Object} options 配置对象
//      * @return {*} 实例
//      */
//     function createInstance (options) {
//       // 创建构造器
//       const Ctor = Vue.extend(Dialog)
//       // 创建实例，并实例挂 (instance 实例)
//       const instance = new Ctor({
//         propsData: options
//       }).$mount(document.createElement('div'))

//       // 监听close事件
//       // instance.$once('close', function () {
//       // })

//       return instance
//     }

//     // 在vue原型，添加实例方法
//     Vue.prototype.$dialog = function (options) {
//       createInstance(options)
//     }
//   }
// }
