Vue.component("my-component", {
  template: '<p class="foo bar">Hi</p>'
});

var app = new Vue({
  el: "#app",
  data: {
    message: "Hello Vue!",
    isActive: false,
    errorClass: "text-danger",
    activeColor: "red",
    fontSize: 30,
    style: {
      color: "crimson",
      fontSize: '4px'
    }
  },
  methods: {
    onChangeText: function(e) {
      this.message = e.target.value;
    },
    onButtonClicked: function(e) {
      this.isActive = !this.isActive;
      this.activeColor = this.isActive ? "red": "black";
    }
  },
  computed: {
    hasError: function() {
      if (this.isActive) {
        return true;
      }
      return false;
    },
    getClass: function() {
      return this.isActive ? { static: true } : { active: true };
    }
  }
});
