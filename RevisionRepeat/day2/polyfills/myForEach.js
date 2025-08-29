const arr = [1, 2, 3, 4, 5, 6];

Array.prototype.myForEach = function (callback) {
  if (typeof callback !== "function") {
    throw new TypeError("callback must be a function");
  }
  let arr = this;
  for (let i = 0; i < arr.length; i++) {
    if (i in arr) {
      callback(arr[i], i, arr);
    }
  }
};

arr.myForEach((x) => console.log(x));
