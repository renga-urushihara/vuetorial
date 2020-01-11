Vue.component("button-counter", {
  data: function() {
    return {
      count: 0,
      text: ""
    };
  },
  computed: {
    getLength() {
      return this.text.length;
    }
  },
  template: `
    <div>
        <button v-on:click="count++">You clicked me {{ count }} times.</button>
        <div>
            <textarea v-model="text" row=4 col=20 />
        </div>
        <div>
            <span>{{ text }}</span>
        </div>
    </div>
    `
});

new Vue({ el: "#components-demo" });
