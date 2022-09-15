<template>
  <div class="mu-inputNumber">
    <Mu-Input
      type='text'
      center
      :name="name"
      :disabled="disabled"
      :width="'60px'"
      v-model.number="inputValue"
    >
      <!-- 前缀 -->
      <div
        class="compute_btn"
        :class="{
          'is-disabled': decreaseDisabled
        }"
        slot="prepend"
        @click="handleClick('decrease')"
      >
        <i class="m-icon-jian"></i>
      </div>
      <!-- 后缀 -->
      <div
        class="compute_btn"
        :class="{
          'is-disabled': increaseDisabled
        }"
        slot="append"
        @click="handleClick('increase')"
      >
        <i class="m-icon-jia"></i>
      </div>
    </Mu-Input>
  </div>
</template>

<script>
import MuInput from './Input.vue'
export default {
  name: 'Mu-InputNumber',
  components: { MuInput },
  props: {
    // 名称
    name: {
      type: String,
      default: ''
    },
    // 值
    value: {
      type: [Number, String],
      default: 0
    },
    // 步长
    step: {
      type: Number,
      default: 1
    },
    // 最小值
    min: {
      type: Number,
      default: -Infinity // 负无穷大
    },
    // 最大值
    max: {
      type: Number,
      default: +Infinity // 正无穷大
    },
    // 精度
    precision: {
      type: [Number, String],
      default: 0
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  },
  computed: {
    inputValue: {
      get () {
        return isNaN(this.value) ? 0 : this.value
      },
      set (newValue) {
        const { min, max, inputValue } = this
        console.log('min ==> ', min, 'max ==> ', max)

        // 数值限制
        const limit = [
          {
            // 判断是否为Number类型，如果不是数字就不改变数值，保持原状
            validate: value => !this.isNumber(value),
            result: Number(inputValue)
          },
          {
            // 如果 <= 最小值
            validate: value => value <= min,
            result: min
          },
          {
            // 如果 >= 最大值
            validate: value => value >= max,
            result: max
          },
          {
            // 其它情况
            // validate: value => (min < value || value < max),
            validate: value => true,
            result: newValue * 1
          }
        ]

        // 寻找符合条件的第一个选项，获取其结果
        const _value = limit.find(item => item.validate(newValue)).result

        console.log('inputValue ==> ', inputValue, 'newValue ==> ', newValue, '_value ==> ', _value)
        console.log('this.precision ==> ', this.precision, '_value ==> ', _value.toFixed(this.precision))

        // .toFixed() 取小数点指定位置
        this.$emit('input', _value.toFixed(this.precision))
      }
    },
    decreaseDisabled () {
      // 减法禁用
      return this.disabled || this.inputValue <= this.min
    },
    increaseDisabled () {
      // 加法禁用
      return this.disabled || this.inputValue >= this.max
    }
  },
  methods: {
    handleClick (type) {
      if (this.disabled) return

      if (type === 'increase') {
        // 加法
        if (this.increaseDisabled) return
        this.inputValue = Number(this.inputValue) + this.step
        console.log('加法 ==> ')
      } else {
        // 减法
        if (this.decreaseDisabled) return
        this.inputValue = Number(this.inputValue) - this.step
        console.log('减法 ==> ')
      }
    },
    // 判断是否为Number类型
    isNumber (num) {
      return !isNaN(num * 1) && Object.prototype.toString.call(num * 1) === '[object Number]'
    }
  }
}
</script>

<style lang="scss" scoped>
.mu-inputNumber {
  display: inline-block;

  .compute_btn {
    cursor: pointer;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .is-disabled {
    color: #c0c4cc !important;
    cursor: not-allowed;
  }
}
</style>
