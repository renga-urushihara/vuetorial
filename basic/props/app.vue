<template>
  <div id="app">
    <p>{{count}} 回、子供のボタンが押されました</p>
    <Child msg="Hello World" @ChildBtnClick="increment" />
  </div>
</template>

<script>
import Child from './Child.vue'

export default {
  name: 'app',
  data () {
    return {
      count: 0
    }
  },
  components: {
    Child
  },
  methods: {
    increment () {
      this.count++
    }
  },

}
</script>