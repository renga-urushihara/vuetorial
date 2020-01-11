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
  computed: {
    // messageのゲッターとセッターのカスタム
    Message: {
      get: function() {
        return this.message + '!';
      },
      set: function(next) {
        console.log(next);
      }
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
