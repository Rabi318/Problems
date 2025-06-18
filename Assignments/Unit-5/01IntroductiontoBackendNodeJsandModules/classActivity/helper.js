//Custom Module
function count() {
  for (let i = 0; i < 10; i++) {
    console.log(i);
  }
}

//Custom Module created by the developer
function sum(a, b) {
  return `Sum of ${a} and ${b} is ${a + b}`;
}

module.exports = { count, sum };
