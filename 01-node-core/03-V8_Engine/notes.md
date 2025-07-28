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

#### Compilation Pipeline

**_ 1. Parsing Phase _**

Steps:

(i) Lexical Analysis a.k.a. Tokenization : 
    - "scanner/Lexer" converts/breaks down the entire code into TOKENS
    - Tokens can be every single parts of a code 
        e.g. let a = 90 ;
        here "let", "a", "=", "90", ";", everything are Tokens

(ii) Syntax Analysis a.k.a Parsing :
    - A "Parser" creates Abstract Syntax Tree (AST) using those created Tokens
    - we can see the AST using [https://astexplorer.net/]

**_ 2. Interpretation/Ignition Phase _**

Steps:
