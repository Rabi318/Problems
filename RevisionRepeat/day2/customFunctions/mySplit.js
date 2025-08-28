function mySplit(str, separator) {
  if (typeof str !== "string") throw new Error("str must be a string");
  const res = [];
  let curr = "";
  for (let i = 0; i < str.length; i++) {
    let match = true;
    for (let j = 0; j < separator.length; j++) {
      if (str[i + j] !== separator[j]) {
        match = false;
        break;
      }
    }
    if (match) {
      res[res.length] = curr;
      curr = "";
      i += separator.length - 1;
    } else {
      curr += str[i];
    }
  }
  res[res.length] = curr;
  return res;
}

console.log(mySplit("hello world", " "));
console.log(mySplit("abc", ","));
