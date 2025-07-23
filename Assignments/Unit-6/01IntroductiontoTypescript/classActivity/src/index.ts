console.log("System Design");
//!Transpilation of typescript to javascript
//! Transpilation : HL to HL
//! Compilation : HL to LL
// HL : js, ts, java, python
//LL : binary, machine code

const myVar: String = "Hello World";
const myVar2: Number = 21;

//types in typescript : String, Number, Boolean, Array, any, null, void, undefined, object

const myNum: number = 24;
const myArr: string[] = ["hello", "world"];
const myArr2: number[] = [1, 2, 3, 4, 5];

const myObj: { name: string; age: number } = {
  name: "Alex",
  age: 23,
};

console.log(myArr);
console.log(myArr2);
console.log(myObj);

let a: number = 10;
let b: string = "hello";
let c: boolean = true;
let d: number[] = [1, 2, 3];

//if you do not know the type
let e: any = 19;

// | = union type: vaiable can hold number or null
//!null: absence of value
let f: number | null = null;

//!void: absence of  return type of the function
function printHello(): void {
  console.log("hello");
}
function sum1(a: number, b: number): void {
  console.log(a + b);
}
function sum(a: number, b: number): number {
  return a + b;
}

//!undefined: variable is declared but not initialized

let g: undefined;

//! unknown
//any v/s unknown: diff
// which is better?
let h: unknown = "hello1";
let i: any = "hello2";
