/**
 * vue 自定义指令 (全局)
 */

export default {
  // 拖拽元素 (使用 v-drag)
  drag: function (el) {
    // 鼠标按下事件
    el.onmousedown = function (ev) {
      // 计算差距
      const disX = ev.clientX - el.offsetLeft
      const disY = ev.clientY - el.offsetTop
      // 设置鼠标样式
      el.style.cursor = 'move'

      // 鼠标移动
      document.onmousemove = function (ev) {
        const l = ev.clientX - disX
        const t = ev.clientY - disY
        el.style.left = l + 'px'
        el.style.top = t + 'px'
      }

      // 鼠标抬起事件
      document.onmouseup = function () {
        // 设置鼠标样式
        el.style.cursor = 'default'
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  }
}
