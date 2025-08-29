const arr = [1, 2, 3, 4, 5];

Array.prototype.myMap = function (callback) {
  if (typeof callback !== "function") {
    throw new TypeError("the first agrument must be a function");
  }
  let res = [];
  let arr = this;
  for (let i = 0; i < arr.length; i++) {
    if (i in arr) {
      res.push(callback(arr[i], i, arr));
    }
  }
  return res;
};

console.log(arr.myMap((x) => x * 2));
