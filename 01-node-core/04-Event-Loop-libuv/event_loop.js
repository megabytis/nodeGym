"use strict";

// // EXAMPLE - 1
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

// E
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

const a = 39;

// A
setImmediate(() => console.log("A: setImmediate called"));

// B
Promise.resolve().then(() => console.log("B: Promise called"));

// C
fs.readFile("./useMe.txt", "utf8", () => {
  console.log("C: readfile called");
});

// D
setTimeout(() => console.log("D: timer called"), 0);

// E
process.nextTick(() => console.log("E: nextTick called"));

function printA() {
  console.log("F: function called");
}

// F
printA();

// G
console.log("G: normal line logged");

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
