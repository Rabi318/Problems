//Sum of individual digits in an array

function sumOfDigits(arr) {
  let totalSum = 0;
  for (let num of arr) {
    let sum = 0;
    while (num > 0) {
      sum += num % 10;
      num = Math.floor(num / 10);
    }
    totalSum += sum;
  }
  return totalSum;
}

const arr1 = [12, 14, 16, 17, 29];
console.log(sumOfDigits(arr1));
