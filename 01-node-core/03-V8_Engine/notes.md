# 🔧 V8 JavaScript Engine – Architecture & Internals

**V8** is Google’s open-source **JavaScript and WebAssembly engine**, written in **C++**. It powers:

- 🧭 Google Chrome
- 🟦 Node.js
- 🦕 Deno
- 🖥️ Electron apps
- ⚙️ Many other JavaScript runtimes

---

## 🧠 V8 Architecture Overview

```text
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
```

> ![V8 Phases Diagram](./images/v8_phases.png)

---

## 1️⃣ Parsing Phase

### 🧩 (i) Lexical Analysis (Tokenization)

- The **Scanner/Lexer** breaks code into **tokens**.
- A **token** is the smallest individual unit (e.g. keywords, identifiers, operators).

Example:

```js
let a = 90;
```

Tokens: `"let"`, `"a"`, `"="`, `"90"`, `";"`

---

### 🧱 (ii) Syntax Analysis (Parsing)

- A **Parser** builds an **Abstract Syntax Tree (AST)** using tokens.
- You can visualize an AST here: [AST Explorer](https://astexplorer.net/)

---

## 2️⃣ Interpretation Phase

### 🎛 Ignition Interpreter

- Converts JS code to **Bytecode**.
- Bytecode is ready for **execution by V8 runtime**.

---

## 3️⃣ Optimization Phase

### 🚀 TurboFan Optimizing Compiler

- Identifies **hot code** (frequently executed functions or blocks).
- Optimizes the code and compiles it to **highly efficient machine code**.

Example of "hot code" optimization:

```js
// Hot function that gets optimized
function add(a, b) {
  return a + b;
}

// Called many times → TurboFan kicks in
for (let i = 0; i < 100000; i++) {
  add(i, i + 1);
}
```

---

> ![V8 Architecture Diagram](./images/v8_arc.png)

---

## 📌 Summary

| Phase                | Engine/Component | Purpose                           |
| -------------------- | ---------------- | --------------------------------- |
| **Lexical Analysis** | Scanner          | Breaks code into tokens           |
| **Syntax Analysis**  | Parser           | Builds the AST                    |
| **Interpretation**   | Ignition         | Converts code to bytecode         |
| **Optimization**     | TurboFan         | Compiles hot code to machine code |
| **Execution**        | Runtime          | Manages memory, GC, and built-ins |

---

> ✨ Understanding V8 internals helps to write performant JS code and debug runtime behavior effectively.
