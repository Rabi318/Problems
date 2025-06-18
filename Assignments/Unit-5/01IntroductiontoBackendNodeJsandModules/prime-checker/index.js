const isPrime = require("./isPrime");

const numbersToCheck = [2, 10, 17, 21, 29, -1, "hello", 3.5];

numbersToCheck.forEach((num) => {
  console.log(isPrime(num));
});
