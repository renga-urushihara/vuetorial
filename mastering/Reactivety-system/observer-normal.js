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