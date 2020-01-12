# Vueの変更検知の仕組み


## Observer Pattern
vueのレンタリング周りが気になったので、ドキュメントの”[公式 リアクティブの探究](https://jp.vuejs.org/v2/guide/reactivity.html)”を一通り見て回る。

targetというグローバルな変数を用意して`Dep`クラスの`depend()`が呼ばれたときにtargetをサブスクライブする。
この例では`total`がグローバルなのでサブスクライブされたtarget関数が呼ばれるとtotalが更新される。
`Dep`クラスにはtarget関数がサブスクライブされているので、`dep.notify()`すると`total`を更新する。

```obsever-nomal.js:js
// to run this, open bash and open `node` then .load this file

class Dep {
  constructor() {
    this.subscribers = [];
  }
  depend() {
    if (target && !this.subscribers.includes(target)) {
      this.subscribers.push(target);
    }
  }
  notify() {
    this.subscribers.forEach(sub => sub());
  }
}

const dep = new Dep();

let price = 5;
let quantity = 2;
let total = 0;

// subscriber
target = () => {
    total = price * quantity;
};

// subscribe
dep.depend();

// initialize target values.
target()
```

ここから少し進化する。
メタプログラミングチック?な感じで`data`変数のプロパティの`setter/getter`を定義しなおして、`data`変数のプロパティの`getter`が呼ばれたときには`target`関数がサブスクライブされるようになる。
`watcher`関数が呼ばれると、`target`変数の初期化と関数の初期化が行われ、`data`プロパティにアクセスがかかり、`getter`が呼ばれることで`Dep`にサブスクライブされる。
`data`プロパティのうち、`watcher`にアクセスされている変数に代入が入ると、`setter`が呼ばれ、対象の`Dep`インスタンスで`notify()`を走らせる。
s
```
// to run this, open bash and open `node` then .load this file

let data = { price: 5, quantity: 2 };
let target // サブスクライブするための中継グローバル変数
let total, salesPrice;

class Dep {
  constructor() {
    this.subscribers = [];
  }
  depend() {
    if (target && !this.subscribers.includes(target)) {
      this.subscribers.push(target);
    }
  }
  notify() {
    this.subscribers.forEach(sub => sub());
  }
}

Object.keys(data).forEach(key => {
  let internalValue = data[key];
  const dep = new Dep();
  Object.defineProperty(data, key, {
    get() {
      console.log(`get Called. ${target}`);
      dep.depend();
      return internalValue;
    },
    set(newVal) {
      internalValue = newVal;
      dep.notify();
    }
  });
});

function watcher(myFunc) {
  // 関数のグローバル変数への代入
  target = myFunc;
  // 初期化とプロパティアクセスによるサブスクライブ
  target();
  // グローバル変数の初期化
  target = null;
}

watcher(() => {
  total = data.price * data.quantity;
});

watcher(() => {
  salesPrice = data.price * 0.9;
});

```
今回のコードはVueの公式Lesson動画から拝借した物だ。シンプルなオブザーバパターンをJSで実装したコードになっている。

## Vueの内部実装の話

> モダンな JavaScript の限界(そして Object.observe の断念)のため、Vue.js はプロパティの追加または削除を検出できません。Vue はインスタンスの初期化中に getter/setter の変換を行うため、全てのプロパティは Vue が変換してリアクティブにできるように data オブジェクトに存在しなければなりません。

この注意書から`Vue.js`では`vm.data`プロパティ配下の`getter/setter`の再定義が後にsetされたプロパティには入らないことがわかる。しかしできないわけではなく、`Vue.set(object, propertyName, value)`もしくは`this.$set(this.someObject, 'b', 2)`すれば変更の検知可能な`data`プロパティとして扱える。だが、必要になることは基本ないのと、再定義されたプロパティアクセスのロジックが入り混じる事になるため、使用は控えるべきだろう。

> データ変更が検出されると、Vue はキューをオープンし、同じイベントループで起こる全てのデータ変更をバッファリングします。同じウォッチャが複数回トリガされる場合、キューには一度だけ入ります。この重複除外バッファリングは不要な計算や DOM 操作を回避する上で重要です。そして、次のイベントループ “tick” で、Vue はキューをフラッシュし、実際の(すでに重複が除外された)作業を実行します。

この話はおそらく各プロパティの`Dep`インスタンスでサブスクライブされている関数のうち、`notify()`された関数をvueモデル全体のキューに入れ込んで、重複を省いて各々実行していくような意味だと思う。

> 例として、vm.someData = 'new value' をセットした時、そのコンポーネントはすぐには再描画しません。 次の “tick” でキューがフラッシュされる時に更新します。

VueはReactと違い、非同期キューでDOMを更新している。これはReactが変更検知時がにすぐレンダリングを行い、DOMの再描画を行うのに対し、Vueは変更を検知すると変更時の処理をキューに押し込み非同期でDOMを更新するということだろう。
つまり、data(Reactでいうstate)の変更が頻繁で、リアルタイム性が必要になるアプリケーションではReactを使うのが良いというような感じだろう。

> 更新した DOM の状態に依存する何かをしたい時は注意が必要です。Vue.js は一般的に”データ駆動”的な流儀で考え、DOM を直接触るのを避けることを開発者に奨励しますが、時にはその手を汚す必要があるかもしれません。データの変更後に Vue.js の DOM 更新の完了を待つには、データが変更された直後に Vue.nextTick(callback) を使用することができます。そのコールバックは DOM が更新された後に呼ばれます。vm.$nextTick() というインスタンスメソッドもあります。これは、グローバルな Vue を必要とせず、コールバックの this コンテキストが自動的に現在の Vue インスタンスに束縛されるため、コンポーネント内で特に役立ちます

DOMを直接いじるような場面では上記２つのようなコールバックを使っていじるべきである。ここら辺はReactとは変わらない。

[公式 リアクティブの探究](https://jp.vuejs.org/v2/guide/reactivity.html)

[公式(動画) 今回のコードの元](https://www.vuemastery.com/courses/advanced-components/build-a-reactivity-system)