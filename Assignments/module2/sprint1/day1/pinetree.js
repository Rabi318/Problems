function PrineTree(n) {
  for (let i = 1; i <= n; i++) {
    let temp = "";
    for (let j = 1; j <= n - i; j++) {
      temp = temp + " ";
    }
    for (let j = 1; j <= 2 * i - 1; j++) {
      temp = temp + "*";
    }
    console.log(temp);
  }
}

PrineTree(5);
