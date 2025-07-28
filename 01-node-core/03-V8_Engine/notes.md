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