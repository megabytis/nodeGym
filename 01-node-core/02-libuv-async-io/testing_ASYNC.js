let a = 87654;
let b = 90110;

function mult(x, y) {
  const answer = x * y;
  return answer;
}

const https = require("https");
https.get("https://api.dictionaryapi.dev/api/v2/entries/en/hello", (res) => {
  console.log(res);
});

const fs = require("fs"); // or require("node:fs")
fs.readFile("./useMe.txt", "utf8", (err, data) => {
  if (err) {
    console.log("Error with abs path : ", err);
  } else {
    console.log("File data : ", data);
  }
});
/* here in "./useMe.txt", ' . ' dot represents current directory so running this file via node from another directory will throw error,
so, have to go to the same directory where the file exists in termial :)
*/
//----------------------OR try this------------------------
// const path = require("path");
// fs.readFile(path.join(__dirname, "useMe.txt"), "utf8", (err, data) => {
//   if (err) {
//     console.log("Error with abs path : ", err);
//   } else {
//     console.log("File data : ", data);
//   }
// });
// this will work, doesn't matter by staying in which directory u r running this file via node , it will work

/* Ther is also an 'sync' function for reading file
fs.readFileSync("./useMe.txt", "utf8", function () {
  // ........
});
*/
/*
this does the same work like readFile(), but synchronously,
i.e.
-> It uses node:fs module, so js will send this function also to libuv
-> but after gping to libuv, still this will block the js file furthur execution process :)

Like this 'readzFileSync()' , ther er many more functions in node modules, where there is a non-sync and a sync version func of it
-> in any function if at the end there is written "sync", i.e. it will also be sent to libuv by js but still it will block the main code, i.e. perform synchronous task
*/

setTimeout(() => {
  console.log("Wait here for 5 seconds");
}, 5000);

var c = mult(a, b);
console.log("Multiplication result:", c);

// Another example :---
const crypto = require("crypto");
// pbkdf2 - password based key derivative function version-2
crypto.pbkdf2("password", "salt", 100000, 20, "sha512", (err, key) => {
  if (err) {
    console.error("PBKDF2 Error: ", err);
  } else {
    console.log("Password generated");
    console.log(key);
  }
});
// it has also "sync" version, which will  block the js execution, i.e. pbkdf2Sync()

// setTimeout : 0
setTimeout(() => {
  console.log("It will be executed immediately");
}, 0);
/*
⚠️⚠️⚠️ V.V. IMPORTANT ⚠️⚠️⚠️
-> here during line by line execution, when js compiler came here it will also be sent to libuv
-> don't think that it's timer is 0 sec, so it will be executed immediately, NOPE ❌ 🤣
-> ASYNC function, means will be sent to libuv, THIS IS FIXED .....
-> after this there is an IIFE function written below👇, this will be pushed to call stack, then will be executed immediately
-> then when there is no more code left , CALL STACK FINALLY WILL BE FREE i.e. once the call stack of main thread will be FREE
-> after that this setTimeout : 0 will be pushed to call stack, then will be executed
*/

console.log(99 + 88);
(function () {
  console.log("Hi hello thsi is the last IIFE function");
})();
