<template>
  <div class="mu-checkbox-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Mu-CheckboxGroup', // 复选框组
  // provide 提供 (`Provide / Inject` 跨组件传递)
  provide () {
    return {
      CheckboxGroup: this
    }
  },
  props: {
    value: null
  }
}
</script>

<style lang="scss" scoped>

</style>
