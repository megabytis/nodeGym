1. Exporting from Individual Files

Method A: Named Export (Best for single functions)

```js
// Export:
// sum.js
function sum(a, b) {
  return a + b;
}
module.exports = sum; // Direct export

// Import:
const sum = require("./sum");
```

Method B: Object Export (Multiple functions)

```js
// Export:
// math.js
function sum(a, b) {
  return a + b;
}
function mult(a, b) {
  return a * b;
}
module.exports = { sum, mult }; // Export as object

// Import:
const { sum, mult } = require("./math");
```

2. Aggregating Exports via index.js

Style 1: Explicit Re-export (Most readable)

```js
// index.js
const sum = require("./sum");
const mult = require("./mult");
module.exports = { sum, mult }; // Clear namespace
```

Style 2: Concise Re-export (For many files)

```js
// index.js
module.exports = {
  sum: require("./sum"),
  mult: require("./mult"),
};
```

Style 3: Dynamic Re-export (Advanced, auto-loads all files)

```js
// index.js
const fs = require("fs");
const path = require("path");

module.exports = fs
  .readdirSync(__dirname)
  .filter((file) => file !== "index.js")
  .reduce((exports, file) => {
    const name = path.basename(file, ".js");
    exports[name] = require(`./${file}`);
    return exports;
  }, {});
```

3. Importing the Module

Case 1: Default Import

```js
const math = require("./mathOperations");
math.sum(2, 3);
```

Case 2: Destructured Import

```js
const { sum, mult } = require("./mathOperations");
```
