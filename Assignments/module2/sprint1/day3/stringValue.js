function stringValue(S) {
  let tv = 0;
  for (let i = 0; i < S.length; i++) {
    let val = S[i].charCodeAt() - 96;
    tv = tv + val;
  }
  console.log(tv);
}
stringValue("abc");
