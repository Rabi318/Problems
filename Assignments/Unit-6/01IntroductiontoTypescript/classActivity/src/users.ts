//variables: manual work: human errors
let user1 = "abc";

let interest1 = "system design";

//js objects
let userjs1 = {
  name: "xyz",
  interest: "system design",
};
let userjs2 = {
  name: "xyz",
  interest: "system design",
  introduce: function () {
    console.log(
      `Hi, my name is ${this.name} and I am interested in ${this.interest}`
    );
  },
};

//prototype
// function User(name, interest) {
//   this.name = name;
//   this.interest = interest;
//   this.introduce = function () {
//     console.log(`Hi, my name is ${this.name} and I am interested in ${this.interest}`);
//   }
// }

// class User {
//   //member vaiables
//   name: string;
//   interest: string;

//   //constructor: is a special function that is called when an object is created
//   constructor(name: string, interest: string) {
//     this.name = name;
//     this.interest = interest;
//   }
//   //member functions
//   introduce(): void {
//     console.log(
//       `Hi, my name is ${this.name} and I am interested in ${this.interest}`
//     );
//   }
// }

// let person: User = new User("xyz", "system design");

// person.introduce();

// class IndianDuck {
//   swin(): void {
//     console.log("I Know swimming");
//   }

//   sound(): void {
//     console.log("Quack Quack");
//   }

//   fly(): void {
//     console.log("I can fly 1km");
//   }
// }

// class AmericanDuck {
//   swin(): void {
//     console.log("I Know swimming");
//   }

//   sound(): void {
//     console.log("Quack Quack");
//   }

//   fly(): void {
//     console.log("I can fly 10km");
//   }
// }

//Inheritance
class Duck {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  swin() {
    console.log("I know swimming");
  }

  sound() {
    console.log("Quack Quack");
  }

  //variable functional
  fly() {
    console.log("I can fly");
  }
}

//!inheritance
class IndianDuck extends Duck {
  constructor(name: string) {
    super(name);
  }
  //overriding
  fly(): void {
    console.log("I can fly 1km");
  }
}
let iduck = new IndianDuck("Indian Duck");
iduck.fly();

//access modifiers: public, private, protected
// class Person {
//   public name: string;
//   private mobileNumber: number = 292929;
//   protected dept: string;
//   constructor(name: string, dept: string) {
//     this.dept = dept;
//     this.name = name;
//   }
//   askMob() {
//     console.log(`My mob is ${this.mobileNumber}`);
//   }
// }

// class Emp1 extends Person {
//   constructor(name: string, dept: string) {
//     super(name, dept);
//   }
// }

// let p1 = new Person("rabi", "sde");
// console.log(p1.name);

//types of inheritance

//1. single level inheritance : p->c
//2. multilevel inheritance: p->c1->c2
//3. hierarchical inheritance: p->c1, p->c2

//method overloading: same name but different parameters or constructor

//In ts there is no true method overloading

// function sum(a: number, b: number): number{
//   return a + b;
// }

// function sum(a: number, b:number, c:number): number{
//   return a + b + c;
// }

//How to achive method overloading
