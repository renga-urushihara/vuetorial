var app = new Vue({
  el: "#app",
  data: {
    message: "Hello Vue!",
    items: [{ message: "Foo" }, { message: "Bar" }],
    object: {
      title: "How to do lists in Vue",
      author: "Jane Doe",
      publishedAt: "2016-04-10"
    }
  },
  methods: {
    onChangeText: function(e) {
      this.message = e.target.value;
      this.items = this.items.filter(function (item) {
        return item.message.match(/Foo/)
      })
    },
    addItems: function() {
      console.log(this.items[this.items.length - 1])
      this.items.splice(this.items.length - 2, 1, {message: "hoge"})
    }
  }
});
