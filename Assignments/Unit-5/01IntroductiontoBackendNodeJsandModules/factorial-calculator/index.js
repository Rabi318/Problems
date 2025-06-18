const factorial = require("./factorial");

const testValues = [5, 7, 10, -3, "hello", 3.5, 0];

testValues.forEach((value) => {
  console.log(factorial(value));
});
