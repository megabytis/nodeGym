V8 is Google's open-source JavaScript and WebAssembly engine, written in C++. It's the engine that powers:

    - Google Chrome browser
    - Node.js
    - Deno
    - Electron applications
    - Many other JavaScript runtimes

Architecture Overview
┌─────────────────────────────────────────┐
│              JavaScript                 │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│           Parser & Compiler             │
│  • Parser                               │
│  • Ignition (Interpreter)               │
│  • TurboFan (Optimizing Compiler)       │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│              Runtime                    │
│  • Heap Management                      │
│  • Garbage Collector                    │
│  • Built-in Functions                   │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│            Machine Code                 │
└─────────────────────────────────────────┘

![V8 Engine Phases](./images/v8_phases.png)

#########################
**_ 1. Parsing Phase _**
#########################

Steps:

### (i) Lexical Analysis a.k.a. Tokenization : 

    - "scanner/Lexer" converts/breaks down the entire code into TOKENS
    - Tokens can be every single parts of a code 
        e.g. let a = 90 ;
        here "let", "a", "=", "90", ";", everything are Tokens

### (ii) Syntax Analysis a.k.a Parsing :

    - A "Parser" creates Abstract Syntax Tree (AST) using those created Tokens
    - we can see the AST using [https://astexplorer.net/]

**_ 2. Interpretation Phase _**

- V8's interpreter name: "IGNITION Interpreter"

# Steps:

    - Ignition interpreter converts js code to 'Byte Code'
    - ByteCode is now ready for execution

**_ 3. Optimization Phase _**

- V8's optimizing compiler name: "TurboFan"

# Steps:

    - After code interpreted, whatever from the code is reused / being used again and again / needs Optimization (k.a. HOT codes :), will be sent to TurboFan
    - this process is k.a. OPTIMIZATION
    - then TurboFan generates highly Otimized Machine Code
    - Now the Optimized machine code is again ready for Execution
    
e.g.
```js
// Hot function that gets optimized
function add(a, b) {
return a + b;
}

// Called many times → TurboFan optimizes it
for (let i = 0; i < 100000; i++) {
add(i, i + 1);
}
```




![V8 Engine](./images/v8_arc.png)