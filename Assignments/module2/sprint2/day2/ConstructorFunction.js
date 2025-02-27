function Person(name, age) {
  this.name = name;
  this.age = age;

  this.displayInfo = function () {
    console.log(`Name: ${this.name}, Age: ${this.age}`);
  };

  this.displayInfoBound = this.displayInfo.bind(this);
}

const person1 = new Person("Alice", 30);

person1.displayInfoBound();
