"use strict";

const https = require("https");
const fs = require("fs");

var a = 1078698;
var b = 20986;

// A
https.get(
  "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/global-shark-attack/records?limit=20&refine=date%3A%222023%2F08%22",
  (res) => {
    console.log("A : HTTP request called");
  }
);

// B
setImmediate(() => console.log("B : setImmediate called"));

// C
fs.readFile("./useMe.txt", "utf8", (err, data) => {
  console.log("C : readfile called");
});

function multiplyFn(x, y) {
  return "E : MultiplyFn called";
}

// D
setTimeout(() => {
  console.log("D : setTimeout called");
}, 5000);

// E
console.log(multiplyFn(a, b));

// RESULT :----------
/*
E : MultiplyFn called
C : readfile called
B : setImmediate called
D : setTimeout called
A : HTTP request called
*/
