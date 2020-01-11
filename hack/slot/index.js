var app = new Vue({
  el: "#app",
  data: {
    message: "Hello Vue!"
  },
  methods: {
    onChangeText: function(e) {
      this.message = e.target.value;
    },
    someFetch: function(e) {
      console.log("someFetch", e);
    }
  },
  watch: {
    message: {
      handler: "someFetch",
      // createdに割り込むコードが消せる。
      immediate: true
    }
  }
});
