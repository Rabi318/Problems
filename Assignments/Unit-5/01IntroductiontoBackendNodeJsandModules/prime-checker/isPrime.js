function isPrime(num) {
  if (typeof num !== "number" || !Number.isInteger(num)) {
    return `${num} is not a valid integer`;
  }
  if (num < 2) {
    return `${num} is not a prime number.`;
  }
  if (num === 2) {
    return `${num} is a prime number.`;
  }
  if (num % 2 === 0) {
    return `${num} is not a prime number.`;
  }
  const sqrt = Math.sqrt(num);
  for (let i = 3; i <= sqrt; i += 2) {
    if (num % i === 0) {
      return `${num} is not a prime number.`;
    }
  }
  return `${num} is a prime number.`;
}
module.exports = isPrime;
