// グローバルに登録されたコンポーネントは、その後に作成された
// ルート Vue インスタンス(new Vue)のテンプレートで使用できます。
// さらに、その Vue インスタンスのコンポーネントツリーのすべての
// サブコンポーネント内でも使用できます。
Vue.component("button-counter", {
  // コンポーネントの data オプションは関数でなければなりません。
  // 各インスタンスが返されるデータオブジェクトの独立したコピーを保持できるためです
  // Vue にこのルールがない場合、ボタンを1つクリックすると、
  // すべての他のインスタンスのデータに影響します
  data: function() {
    return {
      count: 0
    };
  },
  template:
    '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
});

Vue.component("blog-post", {
  props: ["title"],
  // すべてのコンポーネントに単一のルート要素が必要
  // template: '<h3>{{ title }}</h3><div v-html="content"></div>'
  template: `
  <div>
  <h3>{{ title }}</h3>
  <div v-html="title"></div>
  </div>
  `
});

Vue.component("blog-post-custom", {
  props: ["post"],
  // すべてのコンポーネントに単一のルート要素が必要
  // template: '<h3>{{ title }}</h3><div v-html="content"></div>'
  template: `
  <div>
  <h3>{{ post.title }}</h3>
  <button v-on:click="$emit('enlarge-text2', 0.1)">Enlarge text</button>
  <div v-html="post.content"></div>
  </div>
  `
});

Vue.component("custom-input", {
  props: ["value"],
  template: `
    <input
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)"
    >
  `
});

Vue.component("alert-box", {
  // reactのchildren的な？
  template: `
    <div class="demo-alert-box">
      <strong>Error!</strong>
      <slot></slot>
    </div>
  `
});

Vue.component("tab", {
  template: `
  <div>
  <h2>this is tab</h2>
  </div>
  `
});

var app = new Vue({
  el: "#app",
  data: {
    message: "Hello Vue!",
    posts: [
      { id: 1, title: "My journey with Vue", content: "hoge hgoe dfkalf" },
      { id: 2, title: "Blogging with Vue", content: "hoge hgoe dfkalf" },
      { id: 3, title: "Why Vue is so fun", content: "hoge hgoe dfkalf" }
    ],
    postFontSize: 1
  },
  methods: {
    onChangeText: function(e) {
      this.message = e.target.value;
    }
  },
  computed: {
    currentTabComponent: function() {
      return "tab";
    }
  }
});
