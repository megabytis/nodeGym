###  ############################################# ###
***  Imp file to become a good nodeJS developer 👨‍💻 ***
###  ############################################# ###

- all the codes of MODULE, are wrapped inside a function (IIFE i.e. immediately invoked function expression)
  espeially, when we use "require('./')", nd whatever we imports, immediately in backend all those imported stuffs r being kept in IIFE

```js
(function () {
  // IIFE function
  // imported codes ....
})();
```

we already knew that, IIFE is such type of function, which is wrapped inside '()' nd called immediately after function block end by also using '()' 😉

⚠️⚠️⚠️ very very Important ⚠️⚠️⚠️
=> so overall, whatever code we write in NodeJS, before it is given to V8 engine, all FIRST BEING WRAPPED INSIDE IIFE

### so, what's the need of wrapping nodeJs code in IIFE ??

- first of all wrapping node code inside IIFE, will immediately invoke it, abviously 😜

- secondly, IIFE keeps every variales safe/private inside it,
  i.e. those variables won't interfere with any other variables outside

**_ Qn. How r variables & functions PRIVATE in different modules _**
Ans:- due to require statement & IIFE i.e. Node's wrapper function

**_ Qn. How do u get access to module.exports i.e. where do 'module' come from ? _**
Ans:-
->module is an object representing the current module.
->module.exports is the actual object returned when someone require()s your file.
->basically, Node.js provides 'module' automatically to every file, which is injected to wrapper function along with many more params/args , nd by using it we call 'exports()' function.

```js
(function (module) {
  // imported codes ....
  module.exports = {};
})(module);
```

e.g. :---

```js
const add2nums = (x, y) => {
  const result = x + y;
  console.log(result);
};

function add3nums(a, b, c) {
  console.log(a + b + c);
}

module.exports = { add2nums, add3nums };
```

☝️ is 100% same as 👇

```js
(function (exports, require, module, __filename, __dirname) {
  require("./path");

  const add2nums = (x, y) => {
    const result = x + y;
    console.log(result);
  };

  function add3nums(a, b, c) {
    console.log(a + b + c);
  }

  module.exports = { add2nums, add3nums };
})(exports, require, module, __filename, __dirname);
```

☝️ here we can see, in param, module, require everything r being passed,
so ,whatever we do like import / export anything all r being passed in IIFE

#### 5-step mechanism or require('./) :--

1. **_ Resolving the module _**
   i.e. check/verify wheather the 'require' stuff is an localpath / an nodeJs built-In module / and .json file / what ??

2. **_ Loading the module _**
   file content is loaded according to filetype
   i.e. whatever inside the imported stuff e.g. variables/functions etc... are being loaded

3. **_ wraps inside IIFE _**
   after loading, all imported variables/functions are being wrapped inside IIFE
   -> so, this is the 'compile' step

4. **_ Evaluation _**
   module.exports() happen

5. **_ Caching _**
    When you require() a module, Node.js caches/saves it in memory. Subsequent/further require() of the same module, return the same pre-saved instance, instead of reloading/reevaluating the file.
    e.g. :---
    ```js
    // math.js
    console.log('This runs ONLY ONCE!');
    module.exports = { sum: (a, b) => a + b };

    // app.js
    const math1 = require('./math');  // Logs "This runs ONLY ONCE!"
    const math2 = require('./math');  // NO LOG - uses cached version

    console.log(math1 === math2);    // true (identical object in memory)
    ```
