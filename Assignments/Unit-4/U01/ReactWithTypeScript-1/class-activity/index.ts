let userName: string = "Alex";
let age: number = 25;
let isAdmin: boolean = true;

//! any vs unkonwn

let input: any = "hello"; //it can be any type like number, string, boolean, array, object etc.

let input2: unknown = "Hello World";
if (typeof input2 === "string") {
  console.log(input2.toUpperCase());
}

input2 = 42;

if (typeof input2 === "number") {
  console.log(input2.toFixed(2));
}

//Inference and Explicit Types
let score = 100; //it's a number

// score = "100"; //it's giving an error

// Power of Typescript
//1. AutoCompletion
//2. Refactoring
//3. Inline Documentation

//1. AutoCompletion
type user = {
  name: string;
  age: number;
};
let user: user = {
  name: "Alex",
  age: 23,
};

//2. Refactoring

//double click on the name => click reanem symbl => change the name
function calculateTax(salary: number) {
  return salary * 0.1;
}

//3. Inline Documentation

/**
 * Calculate the sum of a number
 * @param num - gave a number
 * @returns  - return a number by add one
 */
function sum(num: number) {
  return num + 1;
}
// sum(23);

function greet(user: { name: string }) {
  return "Hello" + user.name.toUpperCase();
}
// greet({ name: "Alex" });

function add(a: number, b: number): number {
  return a + b;
}

// add(1, 2);

//creating user type and object
type User = {
  name: string;
  age: number;
};
const userObje: User = {
  name: "Tommy",
  age: 23,
};
function showProfile(userObje: User) {
  console.log(user.name.toUpperCase());
  console.log(user.age.toFixed());
}

//Arrays Tubles Enums
let fruits: string[] = ["apple", "banana", "orange"]; //array
let points: number[] = [1, 2, 3, 4, 5]; //array
let student: [string, number, boolean] = ["Alex", 23, true]; //tuple

enum Direction {
  Up,
  Down,
  Left,
  Right,
}
let move: Direction = Direction.Up;

enum Status {
  Success = "SUCCESS",
  Failure = "FAILURE",
  Error = "ERROR",
}
let data: Status = Status.Success;

//unions
let id: string | number = "1";
id = 1;
// id=true   //it's giving an error

//Intersections
interface Name {
  name: string;
  address: string;
}
interface Age {
  age: number;
}
const person: Name & Age = {
  name: "Alice",
  address: "New York",
  age: 24,
};

const person2: Age = {
  age: 25,
};

//1. Type Narrowing
function printId(id: string | number) {
  if (typeof id === "string") {
    console.log(id.toUpperCase());
  } else {
    console.log("Id is not a string");
  }
}
//2. Type Guard
function isString(val: unknown) {
  return typeof val === "string";
}
function logValue(val: unknown) {
  if (isString(val)) {
    console.log(val.toUpperCase());
  } else {
    console.log("Not a string");
  }
}
