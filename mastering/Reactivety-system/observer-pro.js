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
