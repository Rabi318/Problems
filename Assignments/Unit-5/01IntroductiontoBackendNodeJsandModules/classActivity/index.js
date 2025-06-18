const { count, sum } = require("./helper");
// import { add } from "./esmodulestyste.js";
// const os = require("os");
const fs = require("fs");

// console.log("Hello World");

// console.log(add(2, 3));

//!three types of moudles

//1. custom moudles
// count();
// console.log(sum(2, 3));

// 2. inbuit moudles
// let cps = os.cpus();
// console.log(cps.length);
// console.log("Reading data started...");
// fs.readFile("./data.txt", "utf8", (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data);
//   }
// });
// console.log("Reading data end");

console.log("Started reading data");
let data = fs.readFileSync("./data.txt", "utf-8");
console.log(data);
console.log("Ending reading data");
//Write file
// fs.writeFile(
//   "./data.txt",
//   "this is a new data from write file function",
//   (err) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log("File Written Successfully");
//   }
// );

// 3. third party moudles
