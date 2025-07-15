#### CommonJS (CJS) Modules : (older way)

```js
// Exporting
module.exports = { myFunction, myVariable };

// Importing
const { myFunction } = require("./myModule");
```

-> File extension: .js (or .cjs for explicit CommonJS).
-> Use Case: Legacy Node.js codebases.

#### ES Modules (ESM) : (Modern way)

```js
// Exporting
export const myFunction = () => {};

// Importing
import { myFunction } from "./myModule.mjs";
```

-> File extension: .mjs or "type": "module" in package.json.
-> Use Case: Modern Node.js projects and browser compatibility.

**_ But i'll use CJS (the old way) _**
