/* 
 Problem statement
You are given an array A with Nelements. You are allowed to remove only one element

which makes the sum of all the remaining elements exactly divisible by 7

Your task is to find the first index of smallest element that can be removed from array. If

there is no answer print -1

*/

function applyBasicMaths(N, A) {
  let totalSum = A.reduce((sum, num) => sum + num, 0);
  let minEle = Infinity;
  let minIdx = -1;
  for (let i = 0; i < N; i++) {
    let newSum = totalSum - A[i];
    if (newSum % 7 === 0) {
      if (A[i] < minEle) {
        minEle = A[i];
        minIdx = i;
      }
    }
  }
  console.log(minIdx);
}
