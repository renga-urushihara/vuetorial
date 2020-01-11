var app = new Vue({
  el: "#app",
  data: {
    message: "Hello Vue!",
    awesome: true,
    isOk: false,
    type: "A",
    loginType: "username"
  },
  methods: {
    onChangeText: function(e) {
      this.message = e.target.value;
      this.awesome = !this.awesome;
      this.isOk = !this.isOk;
      this.loginType = "hoge"
    },
  },
});
