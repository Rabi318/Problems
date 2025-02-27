function setTimeoutGreeting(person) {
  setTimeout(
    function () {
      console.log(`Hello, ${this.name}`);
    }.bind(person),
    1000
  );
}

const person = {
  name: "Alice",
};

setTimeoutGreeting(person);
