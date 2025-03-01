function identifyPrime(num) {
  if (num < 2) {
    console.log("No");
    return;
  }
  for (let i = 2; i * i <= num; i++) {
    if (num % i === 0) {
      console.log("No");
      return;
    }
  }
  console.log("Yes");
}
