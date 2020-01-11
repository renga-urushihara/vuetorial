var app = new Vue({
  el: "#app",
  data: {
    message: "Hello Vue!"
  },
  methods: {
    onChangeText: function(e) {
      this.message = e.target.value;
    }
  },
});
