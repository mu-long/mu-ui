import Message from './Message.vue'

// 实例数组
const instanceArr = []
// 垂直方向的top距离
const verticalTop = 16
let index = 0

/**
 * 计算垂直方向的top距离
 *
 * @param {Number} position 位置
 * @return {Number} 新位置
 */
function computedVerticalTop (position) {
  // 过滤出同种位置的实例
  const filterInstanceArr = instanceArr.filter(item => item.position === position)
  // accumulator 累加器(累积值，或初始值); currentValue 当前值
  return filterInstanceArr.reduce(
    // (累积值，或初始值) + 实例的高度 + 16
    (acc, cur) => acc + cur.$el.offsetHeight + verticalTop,
    // 初始值
    verticalTop
  )
}

/**
 * 更新垂直方向的top距离
 *
 * @param {*} instance 实例
 */
function updateVerticalTop (instance) {
  // 当前移除实例的top距离
  let removeTop = instance.verticalTop
  let i = 0
  // 找到当前移除的实例
  for (; i < instanceArr.length; i++) {
    if (instanceArr[i].id === instance.id) break
  }

  // 分割实例数组
  instanceArr.splice(i, 1)

  for (; i < instanceArr.length; i++) {
    // 如果实例是同种位置
    if (instanceArr[i].position === instance.position) {
      // 当前实例的top距离 = 移除当前实例的top距离(removeTop)
      // instanceArr[i].verticalTop = removeTop
      // 移除实例的top距离(removeTop) = 当前实例的top距离
      // removeTop = instanceArr[i].verticalTop
      ;[instanceArr[i].verticalTop, removeTop] = [removeTop, instanceArr[i].verticalTop]
    }
  }
}

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
      const Ctor = Vue.extend(Message)
      // 创建实例，并实例挂 (instance 实例)
      const instance = new Ctor({
        propsData: options
      }).$mount(document.createElement('div'))

      // 设置垂直方向的top离
      instance.verticalTop = computedVerticalTop(instance.position)

      instance.id = 'msg_' + index++

      // 监听close事件
      instance.$once('close', function () {
        // 更新垂直方向的top距离
        updateVerticalTop(instance)
      })

      return instance
    }

    // 在vue原型，添加实例方法
    Vue.prototype.$message = function (options) {
      const instance = createInstance(options)
      // 放入实例数组
      instanceArr.push(instance)
    }
  }
}
