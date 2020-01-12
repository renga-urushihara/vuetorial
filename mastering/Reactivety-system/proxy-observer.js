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

let deps = new Map();

Object.keys(data).forEach(key => {
    deps.set(key, new Dep());
});

let data_without_proxy = data;

data = new Proxy(data_without_proxy, {
    get(obj, key) {
        deps.get(key).depend();
        return obj[key];
    },
    set(obj, key, newVal) {
        console.log(obj);
        obj[key] = newVal;
        deps.get(key).notify();
        return true;
    }
})

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
