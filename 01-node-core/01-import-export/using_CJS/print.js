// // accepting METHOD-1
// // accepting variables from an .js file also as variables
// const { name, calcAge, yrOfBir } = require("./app.cjs");

// console.log(`${name} is ${calcAge(yrOfBir)} y/o`);

// // accepting METHOD-2
// // accepting eveyrthing/an entire exported object  from an .js file as an object
// const multiplication = require("./mathOperations/mult.js");
// const addition = require("./mathOperations/sum.js");

// multiplication.multiply(34, 10);
// addition.add(20, 2);

// //---------------------------------------------------------
// // *** Method-1 is always easy to write & understand ***
// const { add } = require("./mathOperations/sum.js");
// const { multiply } = require("./mathOperations/mult.js");
// add(99, 11);
// multiply(999, 0);

// // --------------------------------------------------------
const { add, mul } = require("./mathOperations");

mul.multiply(2, 2);
add.add2nums(3, 3);

// Now what happened, this print.js file don't even know the exact location of mult.js, sum.js
// so they are alomst hidden to user :), user will only get to know about index.js :)
/*
Like we created 'mathOperations' a module, imported it , 
inside it there r many functions written, we can call them.
like this there are also many many nodeJs built-In modules e.g. utils, path, os, https etc.... many more, inside them, functions +nt there 
e.g :--- 
*/
const ut = require("util");
// now by doing 'ut.' we can access many functions present inside 'utils' module

// Accessing json file
const data = require("./userData.json");
console.log(JSON.stringify(data));
