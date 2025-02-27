function filterEvenNumber(arr) {
  let evenNumber = arr.filter((num) => num % 2 === 0);
  return evenNumber;
}
console.log(filterEvenNumber([1, 2, 3, 4, 5]));

function sumOfArray(arr) {
  let sum = arr.reduce((acc, num) => acc + num, 0);
  return sum;
}
console.log(sumOfArray([1, 2, 3, 4, 5]));

function sortAndConcat(arr1, arr2) {
  let newArr1 = arr1.sort((a, b) => a - b);
  let newArr2 = arr2.sort((a, b) => a - b);
  return newArr1.concat(newArr2);
}

console.log(sortAndConcat([1, 3, 2], [6, 5, 4]));
