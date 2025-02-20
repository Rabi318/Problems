function alanChristopher(S) {
  let stack = [];
  for (let char of S) {
    if (char === "#") {
      if (stack.length > 0) stack.pop();
    } else {
      stack.push(char);
    }
  }
  console.log(stack.join(""));
}

alanChristopher("abc#d##c");
