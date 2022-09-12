<template>
  <div class="mu-radioGroup">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Mu-RadioGroup',
  // provide 提供 (`Provide / Inject` 跨组件传递)
  provide () {
    return {
      RadioGroup: this
    }
  },
  props: {
    value: null
  }
}
</script>

<style lang="scss" scoped>
</style>
