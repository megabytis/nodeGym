"use strict";

// EXAMPLE - 1
const https = require("https");
const fs = require("fs");

// var a = 1078698;
// var b = 20986;

// // A
// https.get(
//   "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/global-shark-attack/records?limit=20&refine=date%3A%222023%2F08%22",
//   (res) => {
//     console.log("A : HTTP request called");
//   }
// );

// // B
// setImmediate(() => console.log("B : setImmediate called"));

// // C
// fs.readFile("./useMe.txt", "utf8", (err, data) => {
//   console.log("C : readfile called");
// });

// function multiplyFn(x, y) {
//   return "E : MultiplyFn called";
// }

// // D
// setTimeout(() => {
//   console.log("D : setTimeout called");
// }, 5000);

// // E
// console.log(multiplyFn(a, b));

// RESULT :----------
/*
E : MultiplyFn called
C : readfile called
B : setImmediate called
D : setTimeout called
A : HTTP request called
*/

// EXAMPLE - 2

// // A
// setImmediate(() => console.log("A: setImmediate called"));

// // B
// Promise.resolve().then(() => console.log("B: Promise called"));

// // C
// fs.readFile("./useMe.txt", "utf8", () => {
//   console.log("C: readfile called");
// });

// // D
// setTimeout(() => console.log("D: timer called"), 0);

// // E
// process.nextTick(() => console.log("E: nextTick called"));

// function printA() {
//   console.log("F: function called");
// }

// // F
// printA();

// // G
// console.log("G: normal line logged");

// Expected Output
/*
F: function called
G: normal line logged
E: nextTick called
B: Promise called
D: timer called
C: readfile called
A: setImmediate called
*/

// EXAMPLE - 3

setImmediate(() => console.log("1- setImmediate"));

setTimeout(() => console.log("2- Timer expired"), 0);

Promise.resolve().then(() => console.log("3- Promise"));

fs.readFile("./file.txt", "utf8", () => {
  setTimeout(() => console.log("4- 2nd timer"), 0);

  process.nextTick(() => console.log("5- 2nd nextTick"));

  setImmediate(() => console.log("6- 2nd setImmediate"));

  console.log("7- File Reading CB");
});

process.nextTick(() => console.log("8- nextTick"));

console.log("9- Last line of the file.");

// Expected ouput :---
/*
9- Last line of the file.
8- nextTick
3- Promise
2- Timer expired
7- File Reading CB
5- 2nd nextTick
1- setImmediate
6- 2nd setImmediate
4- 2nd timer
*/
// this is an example of nested callback
// here event-loop will iterate once, then inside readFile there are another callbacks, so, another event-loop iteration will happen
