<template>
  <div>
    <h1>親から渡されたMSGは"{{ this.msg }}"です</h1>
    <button @click="CountUp">カウントアップ</button>
  </div>
</template>

<script>
export default {
  name: 'Child',
  props: {
    msg: String
  },
  methods: {
    CountUp () {
      this.$emit("ChildBtnClick");
    }
  },
}
</script>