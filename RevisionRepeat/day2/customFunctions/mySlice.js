function mySlice(arr, start = 0, end = arr.length) {
  if (!Array.isArray(arr))
    throw new TypeError("First argument must be an array"); // check if the first argument is an array o
  const res = [];
  let actualStart =
    start < 0 ? Math.max(arr.length + start, 0) : Math.min(start, arr.length);
  let actualEnd =
    end < 0 ? Math.max(arr.length + end, 0) : Math.min(end, arr.length);
  for (let i = actualStart; i < actualEnd; i++) {
    if (i in arr) {
      res.push(arr[i]);
    }
  }
  return res;
}

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const slicedArr = mySlice(arr, 2, 6);
console.log(slicedArr);
