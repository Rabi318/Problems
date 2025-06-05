"use strict";
let userName = "Alex";
let age = 25;
let isAdmin = true;
//! any vs unkonwn
let input = "hello"; //it can be any type like number, string, boolean, array, object etc.
let input2 = "Hello World";
if (typeof input2 === "string") {
    console.log(input2.toUpperCase());
}
input2 = 42;
if (typeof input2 === "number") {
    console.log(input2.toFixed(2));
}
//Inference and Explicit Types
let score = 100; //it's a number
let user = {
    name: "Alex",
    age: 23,
};
//2. Refactoring
//double click on the name => click reanem symbl => change the name
function calculateTax(salary) {
    return salary * 0.1;
}
//3. Inline Documentation
/**
 * Calculate the sum of a number
 * @param num - gave a number
 * @returns  - return a number by add one
 */
function sum(num) {
    return num + 1;
}
// sum(23);
function greet(user) {
    return "Hello" + user.name.toUpperCase();
}
// greet({ name: "Alex" });
function add(a, b) {
    return a + b;
}
const userObje = {
    name: "Tommy",
    age: 23,
};
function showProfile(userObje) {
    console.log(user.name.toUpperCase());
    console.log(user.age.toFixed());
}
//Arrays Tubles Enums
let fruits = ["apple", "banana", "orange"]; //array
let points = [1, 2, 3, 4, 5]; //array
let student = ["Alex", 23, true]; //tuple
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 0] = "Up";
    Direction[Direction["Down"] = 1] = "Down";
    Direction[Direction["Left"] = 2] = "Left";
    Direction[Direction["Right"] = 3] = "Right";
})(Direction || (Direction = {}));
let move = Direction.Up;
var Status;
(function (Status) {
    Status["Success"] = "SUCCESS";
    Status["Failure"] = "FAILURE";
    Status["Error"] = "ERROR";
})(Status || (Status = {}));
let data = Status.Success;
//unions
let id = "1";
id = 1;
const person = {
    name: "Alice",
    address: "New York",
    age: 24,
};
const person2 = {
    age: 25,
};
//1. Type Narrowing
function printId(id) {
    if (typeof id === "string") {
        console.log(id.toUpperCase());
    }
    else {
        console.log("Id is not a string");
    }
}
//2. Type Guard
function isString(val) {
    return typeof val === "string";
}
function logValue(val) {
    if (isString(val)) {
        console.log(val.toUpperCase());
    }
    else {
        console.log("Not a string");
    }
}
