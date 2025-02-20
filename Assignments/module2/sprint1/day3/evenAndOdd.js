function battleEvenOdd(N, A) {
  let evenSum = 0;
  let oddSum = 0;
  for (let i = 0; i < A.length; i++) {
    if (A[i] % 2 === 0) {
      evenSum += A[i];
    } else {
      oddSum += A[i];
    }
  }
  if (evenSum > oddSum) {
    console.log("Even");
  } else if (oddSum > evenSum) {
    console.log("Odd");
  } else {
    console.log("Even");
  }
}
battleEvenOdd(5, [1, 2, 3, 4, 5]);
