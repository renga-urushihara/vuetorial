var app = new Vue({
  el: "#app",
  data: {
    message: "Hello Vue!",
    checked: false,
    checkedNames: [],
    picked: null,
    selected: null,
    toggle: null,
    age: 0,
    message2: ''
  },
  methods: {
    onChangeText: function(e) {
      this.message = e.target.value;
    },
    log: function(param){
      console.log(param)
    }
  },
});
