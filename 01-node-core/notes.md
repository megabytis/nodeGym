#### Node.js Definition

    "Node JS - JS on Server" means Node.js allows running JavaScript on the server-side (backend) rather than just in the browser.

    -> server can be an computer with huge resources (RAM, storage, graphics)

#### Node.js Architecture layers

JavaScript (Your Code)
↓
Node.js Bindings (JavaScript ↔ C++ bridge)
↓
V8 Engine (JS Execution) : also written in C++
↓
libuv (Event Loop, Async I/O - Written in C)
↓
Operating System

```
┌─────────────────────────────┐
│          SERVER             │  (Hardware + OS: Linux/Windows/macOS)
│                             │  - Provides system resources
│  ┌───────────────────────┐  │
│  │        Node.js        │  │  (JavaScript Runtime Environment)
│  │                       │  │
│  │   ┌────────────────┐  │  │
│  │   │      V8        │  │  │  (Superpower #1: JS Engine)
│  │   │ (Google's      │  │  │  - JIT Compilation
│  │   │  Turbocharged) │  │  │  - Memory Management
│  │   └────────────────┘  │  │
│  │                       │  │
│  │   ┌────────────────┐  │  │
│  │   │     libuv      │  │  │  (Superpower #2: Async I/O)
│  │   │ (Event Loop    │  │  │  - Non-blocking operations
│  │   │  Magic)        │  │  │  - Filesystem + Network
│  │   └────────────────┘  │  │
│  │                       │  │
│  │   ┌────────────────┐  │  │
│  │   │ C++ Bindings   │  │  │  (Superpower #3: Bridge)
│  │   │ (JS ↔ C++      │  │  │  - fs/crypto/http use C++
│  │   │  Translator)   │  │  │
│  │   └────────────────┘  │  │
│  │                       │  │
│  │   ┌────────────────┐  │  │
│  │   │ Core JS APIs   │  │  │  (Superpower #4: Batteries Included)
│  │   │ (http, fs,     │  │  │  - Backend-ready modules
│  │   │  path, etc.)   │  │  │
│  │   └────────────────┘  │  │
│  └───────────────────────┘  │
└─────────────────────────────┘
```

-> How nodeJs converts to binary ?
nodeJs
↓
Machine code (by C++)
↓
Assembly code
↓
Binary code

#### about nodeJs Modules

    -> modules protects their variables & functions from leaking ,

    ->so, we can't access functions / objects / variables of an js-1 file in another js-2 file

    -> To do that, we have to first export them from js-1 file and imort them in js-2 file, then we can access them in js-2 file
