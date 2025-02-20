function palindrome(num) {
  let original = num;
  let rev = 0;
  while (num > 0) {
    let digit = num % 10;
    rev = rev * 10 + digit;
    num = Math.floor(num / 10);
  }
  console.log(rev === original ? "Yes" : "No");
}

palindrome(121);
