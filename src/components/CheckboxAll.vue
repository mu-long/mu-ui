<template>
  <div class="mu-Checkbox_all">
    <!-- 全选按钮 -->
    <div class="mu-Checkbox_checkAll">
      <slot name="checkAll"></slot>
    </div>
    <!-- 选项 -->
    <div class="mu-Checkbox_options">
      <slot name="options"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Mu-CheckboxAll' // 复选框全选
}
</script>

<style lang="scss" scoped>
.mu-Checkbox_options{
  margin-top: 10px;
}
</style>
