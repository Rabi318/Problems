const boxen = require("boxen");

const message = "I am using my first external module!";

const title = "Hurray!!!";

const classicBox = boxen(message, {
  title: title,
  padding: 1,
  margin: 1,
  borderStyle: "classic",
  borderColor: "yellow",
  backgroundColor: "white",
  align: "center",
});

const singleDoubleBox = boxen(message, {
  title: title,
  padding: 1,
  margin: 1,
  borderStyle: "singleDouble",
  borderColor: "yellow",
  backgroundColor: "white",
  align: "center",
});

const roundBox = boxen(message, {
  title: title,
  padding: 1,
  margin: 1,
  borderStyle: "round",
  borderColor: "yellow",
  backgroundColor: "white",
  align: "center",
});

console.log(classicBox);
console.log(singleDoubleBox);
console.log(roundBox);
