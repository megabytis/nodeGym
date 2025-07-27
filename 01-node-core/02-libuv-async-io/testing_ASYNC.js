let a = 87654;
let b = 90110;

function mult(x, y) {
  const answer = x * y;
  return answer;
}

const https = require("https");
https.get("https://api.dictionaryapi.dev/api/v2/entries/en/hello", (res) => {
  // console.log(res);
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

setTimeout(() => {
  console.log("Wait here for 5 seconds");
}, 5000);

var c = mult(a, b);
console.log("Multiplication result:", c);
