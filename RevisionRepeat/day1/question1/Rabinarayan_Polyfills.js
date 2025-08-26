Array.prototype.mapPolyfill = function (callback, thisArg) {
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (i in this) {
      result.push(callback.call(thisArg, this[i], i, this));
    }
  }
  return result;
};

// const nums = [1, 2, 3];
// console.log(nums.mapPolyfill((x) => x * 2));

Array.prototype.filterPolyfill = function (callback, thisArgs) {
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (i in this) {
      if (callback.call(thisArgs, this[i], i, this)) {
        result.push(this[i]);
      }
    }
  }
  return result;
};
// const numbers = [1, 2, 3, 4, 5];
// console.log(numbers.filterPolyfill((x) => x % 2 === 0));

Array.prototype.reducePolyfill = function (callback, initialValue) {
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }
  let accumulator = initialValue;
  let startIndex = 0;
  if (accumulator === undefined) {
    if (this.length === 0) {
      throw new TypeError("Reduce of empty with no initial value");
    }
    accumulator = this[0];
    startIndex = 1;
  }
  for (let i = startIndex; i < this.length; i++) {
    if (i in this) {
      accumulator = callback(accumulator, this[i], i, this);
    }
  }
  return accumulator;
};

const numbers = [1, 2, 3, 4, 5];
console.log(numbers.reducePolyfill((x, y) => x + y));
