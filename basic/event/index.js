var app = new Vue({
  el: "#app",
  data: {
    message: "Hello Vue!",
    counter: 0
  },
  methods: {
    onChangeText: function(e) {
      this.message = e.target.value;
    },
    say: function(string) {
      console.log(string);
    },
    warn: function (message, event) {
      // ネイティブイベントを参照しています
      if (event) {
        event.preventDefault()
      }
      alert(message)
    },
    onScroll: function(e) {
      e.preventDefault()
      console.log('onclick')
    },
    onEnterkeyPress: function() {
      console.log('enter pressed.')
    },
    onPageDown: function() {
      console.log('onPageDown')
    }
  },
});
