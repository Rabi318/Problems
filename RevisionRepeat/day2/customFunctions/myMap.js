function myMap(arr, clback) {
  if (!Array.isArray(array))
    throw new TypeError("First argument must be an array");
  if (typeof callback !== "function")
    throw new TypeError("Callback must be a function");

  const res = [];
  for (let i = 0; i < arr.length; i++) {
    if (i in arr) {
      res.push(clback(arr[i], i, arr));
    }
  }

  return res;
}

const numbers = [1, 2, 3, 4, 5];
console.log(myMap(numbers, (x) => x * 2));
