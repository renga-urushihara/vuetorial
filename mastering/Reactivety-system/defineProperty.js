let data = { price: 5, quantity: 2 };
Object.keys(data).forEach(key => {
  let internalValue = data[key];
  Object.defineProperty(data, key, {
    get() {
      console.log(`Getting ${key}: ${internalValue}`);
      return internalValue;
    },
    set(newVal) {
      console.log(`Setting ${key}: ${newVal}`);
      internalValue = newVal;
    }
  });
});

let total = data.price * data.quantity;
data.price = 20;
