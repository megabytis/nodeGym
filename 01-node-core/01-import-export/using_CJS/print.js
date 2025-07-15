// accepting variables from an .js file also as variables
const { name, calcAge, yrOfBir } = require("./app.cjs");

console.log(`${name} is ${calcAge(yrOfBir)} y/o`);

// accepting eveyrthing/an entire exported object  from an .js file as an object
const multiplication = require("./mathOperations/mult.js");
const addition = require("./mathOperations/sum.js");

multiplication.multiply(34, 10);
addition.add(20, 2);
