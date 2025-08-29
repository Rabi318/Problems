const arr = [1, 2, 3, 4, 5, 6, 7, 8];

Array.prototype.myFilter = function (callback) {
  if (typeof callback !== "function") {
    throw new TypeError("callback must be a function");
  }
  let res = [];
  let arr = this;
  for (let i = 0; i < arr.length; i++) {
    if (i in arr) {
      if (callback(arr[i], i, arr)) {
        res.push(arr[i]);
      }
    }
  }
  return res;
};

console.log(arr.myFilter((x) => x % 2 === 0));
