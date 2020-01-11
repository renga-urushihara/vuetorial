var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue!',
      isButtonDisable: false
    },
    methods: {
        changeBools: function() {
            this.isButtonDisable = !this.isButtonDisable;
            console.log('changed');
        },
        inlineMethod: function(param, event) {
            console.log(param);
            if (event) {
                console.log(event);
            }
        },
        onSubmit: function(e) {
            console.log(e);
        },
        onOnetimeButtonClicked: function(e) {
            console.log("this message is called once.")
        },
        onKeyup: function(e) {
            console.log(e);
        },
        someFetch: function(e) {
            console.log("someFetch", e);
        },
    },
    // created () {
    //     this.someFetch()
    // },
    watch: {
        isButtonDisable: {
            handler: 'someFetch',
            // createdに割り込むコードが消せる。
            immediate: true
        }
    }
  })