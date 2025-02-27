function extractAndReverse(arr) {
  let extracted = arr.slice(2, 5);
  let reversed = extracted.reverse();
  return reversed;
}
const arr = [15, 30, 45, 60, 75, 90];

console.log(extractAndReverse(arr));
