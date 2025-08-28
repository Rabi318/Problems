function myFilter(arr, callback) {
  if (!Array.isArray(arr)) {
    throw new TypeError("First argument must be an array");
  }
  if (typeof callback !== "function") {
    throw new TypeError("Callback must be a function");
  }
  const res = [];
  for (let i = 0; i < arr.length; i++) {
    if (i in arr) {
      if (callback(arr[i], i, arr)) {
        res.push(arr[i]);
      }
    }
  }
  return res;
}

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const evenNumbers = myFilter(arr, (num) => num % 2 === 0);
console.log(evenNumbers);
