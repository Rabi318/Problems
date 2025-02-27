const arr = ["Charlie", "Alice", "Bob"];

function sortNames(arr) {
  const sortedArr = arr.sort((a, b) => a.localeCompare(b));
  return sortedArr;
}

console.log(sortNames(arr));
