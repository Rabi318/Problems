function niceArray(N, array, K) {
  let evenSum = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i] % 2 === 0) {
      evenSum++;
    }
  }
  if (evenSum > K) {
    console.log("Nice Array");
  } else {
    console.log("Bad Array");
  }
}

niceArray(5, [1, 2, 3, 4, 5], 2);
