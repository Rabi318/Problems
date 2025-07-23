"use strict";
console.log("System Design");
//!Transpilation of typescript to javascript
//! Transpilation : HL to HL
//! Compilation : HL to LL
// HL : js, ts, java, python
//LL : binary, machine code
const myVar = "Hello World";
const myVar2 = 21;
//types in typescript : String, Number, Boolean, Array, any, null, void, undefined, object
const myNum = 24;
const myArr = ["hello", "world"];
const myArr2 = [1, 2, 3, 4, 5];
const myObj = {
    name: "Alex",
    age: 23,
};
console.log(myArr);
console.log(myArr2);
console.log(myObj);
let a = 10;
let b = "hello";
let c = true;
let d = [1, 2, 3];
//if you do not know the type
let e = 19;
// | = union type: vaiable can hold number or null
//!null: absence of value
let f = null;
//!void: absence of  return type of the function
function printHello() {
    console.log("hello");
}
function sum1(a, b) {
    console.log(a + b);
}
function sum(a, b) {
    return a + b;
}
//!undefined: variable is declared but not initialized
let g;
//! unknown
//any v/s unknown: diff
// which is better?
let h = "hello1";
let i = "hello2";
