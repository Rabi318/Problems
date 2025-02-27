function multiplyNumbers(a, b) {
  function multiply(x, y) {
    return x * y;
  }

  return multiply.apply(null, [a, b]);
}

const result = multiplyNumbers(5, 3);
console.log(result);
