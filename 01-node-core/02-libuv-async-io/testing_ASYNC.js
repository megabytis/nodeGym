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

setTimeout(() => {
  console.log("Wait here for 5 seconds");
}, 5000);

var c = mult(a, b);
console.log("Multiplication result:", c);
