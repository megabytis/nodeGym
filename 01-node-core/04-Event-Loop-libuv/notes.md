# 🧠 Node.js Code Execution Flow (Explained with Diagram)

This document explains how the following Node.js code executes using the internal components shown in the image (V8, libuv, OS):

```js
const https = require("https");
const fs = require("fs");

var a = 1078698;
var b = 20986;

https.get("https://api.fbi.com", (res) => {
  console.log(res?.secret);
});

setTimeout(() => {
  console.log("setTimeout");
}, 5000);

fs.readFile("./gossip.txt", "utf8", (err, data) => {
  if (err) throw err;
  console.log("File Data", data);
});

function multiplyFn(x, y) {
  const result = x * y;
  return result;
}

var c = multiplyFn(a, b);
console.log(c);
```

---

## ✅ Step-by-Step Execution Flow

### 1. **V8 JavaScript Engine Loads the Code**

- The **V8 Engine** (bottom left in the image) starts executing code **line by line**, synchronously.
- It handles:
  - **Memory Heap** for memory allocation.
  - **Call Stack** for executing functions.
  - **Garbage Collector** for cleaning up unused memory.

---

### 2. **Variable Declarations and Synchronous Execution**

```js
var a = 1078698;
var b = 20986;
```

- These are stored in memory by the V8 engine.

---

### 3. **HTTPS GET Request (Async Operation)**

```js
https.get("https://api.fbi.com", (res) => {
  console.log(res?.secret);
});
```

- This is a **non-blocking I/O** operation.
- The `https.get()` function is part of the Node.js **standard library**, and internally uses **libuv** to handle networking.
- libuv **offloads this to the OS** (represented on the right in the diagram).
- Once data is returned, the **callback is pushed to the Callback Queue**, waiting for the Event Loop.

---

### 4. **setTimeout (Timer Phase)**

```js
setTimeout(() => {
  console.log("setTimeout");
}, 5000);
```

- The Timer is **registered with libuv**, and executed after ~5000ms.
- libuv **moves the callback to the Timer Phase** of the Event Loop after the delay.

---

### 5. **File Read (Async I/O)**

```js
fs.readFile("./gossip.txt", "utf8", (err, data) => {
  console.log("File Data", data);
});
```

- `fs.readFile()` uses **libuv's Thread Pool** (shown bottom-right of libuv in image).
- File system calls are offloaded to one of the threads.
- Once complete, the callback goes into the **Callback Queue** to be picked up by the Event Loop.

---

### 6. **Synchronous Function Execution**

```js
function multiplyFn(x, y) {
  const result = x * y;
  return result;
}

var c = multiplyFn(a, b);
console.log(c);
```

- This is handled directly in the **Call Stack**.
- No libuv or Event Loop is involved here.
- The result of multiplication is printed immediately.

---

## 🔁 Event Loop Starts

Once synchronous code finishes, the **Event Loop** begins checking:

1. **Timer Queue**: If `setTimeout` is ready, its callback is moved to Call Stack.
2. **I/O Polling Queue**: If file read is complete, `fs.readFile` callback is picked.
3. **Network Queue**: If HTTP request is complete, callback is moved.

Each of these are **executed one-by-one** in the Call Stack.

---

## 🧠 Recap: What Handles What?

```text

| Component   | Responsibility                                           |
| ----------- | -------------------------------------------------------- |
| V8 Engine   | Executes JS, manages memory, handles sync operations     |
| libuv       | Handles async operations (file I/O, network, timers)     |
| Thread Pool | Offloads CPU-intensive I/O operations like `fs.readFile` |
| OS          | Actually performs low-level tasks (file, DNS, net)       |
| Event Loop  | Manages when async callbacks run in main thread          |

```

---

## [🧠 (See: Node.js Internals diagram)](./nodeJs.png)

- 🟦 V8: Handles `multiplyFn`, `console.log`, variable declarations
- 🟪 libuv: Manages `setTimeout`, `https.get`, and `fs.readFile`
- 🔁 Event Loop: Picks callbacks once main thread is free
- 🔶 Thread Pool: Used for `fs.readFile`
- 🌐 OS: Performs actual HTTP & File system operations

---

## ✅ Final Console Output (Example Order)

```
[Some delay...]
22599248228          // result of a * b
File Data <contents of gossip.txt>
setTimeout
undefined            // if res?.secret doesn't exist in the response
```

> _Note: Order of `fs.readFile`, `setTimeout`, and `https.get` output may vary slightly depending on system performance and response time._

---

# 🌀 Node.js Event Loop - Detailed Explanation

[event-loop](./event_loop.png)

The Node.js **Event Loop** is the core mechanism that handles **asynchronous operations** like `setTimeout`, `I/O tasks`, and `Promises`. It allows Node.js to be **non-blocking** and single-threaded while still handling many operations concurrently.

---

## 🔁 Overview

The event loop works in **phases**, where each phase has its own **callback queue**. The loop runs **continuously** — checking queues, executing callbacks, and moving to the next phase.

⚠️⚠️⚠️IMP⚠️⚠️⚠️
previously, we knew that inside libuv, there is an eventLoop, an callback queue & an thread pool, but here it's clear that EVERY PHASE OF EVENT-LOOP has it's special CALLBACK QUEUE :)

---

## 🔄 Phases of the Event Loop

The loop has **six major phases**, shown as a cycle in the diagram:

### 1. ⏲️ **Timers Phase**

- Handles callbacks scheduled by:
  - `setTimeout()`
  - `setInterval()`
- If the timer has expired, its callback is pushed to the **timer queue**.

### 2. 📩 **Poll Phase**

- Handles:
  - I/O events (e.g., incoming network requests[http], file reads[fs], crypto & almost all nodeJs module functions)
  - Fetching data
  - Waiting for new events
- If no timers are ready, it will **block and wait** for callbacks.
- Once events arrive, they are dequeued and executed.

### 3. ⚡ **Check Phase**

- Executes callbacks scheduled by:
  - `setImmediate()`
- This phase runs **after** the poll phase.

### 4. 🔒 **Close Callbacks Phase**

- Executes:
  - `socket.on("close")`
  - Any resource closing logic
- Triggered when a handle/resource is closed.

---

## 🔂 Internal Queues (Between Phases)

Even though the phases look sequential, **microtasks** can interrupt them:

### 🔹 `process.nextTick()` Queue

- Executes _after_ any current operation but _before_ the event loop continues.
- **Higher priority than Promises**

### 🔹 **Promise Callbacks / Microtasks**

- `.then()`, `.catch()`, `.finally()` go here.
- Executed immediately after the current operation and `nextTick()`.

> 🔄 These microtasks / collectively k.a. INTERNAL CYCLES are handled **after each phase** (mentioned in event_lopp image as blue cycles after each phase), before moving to the next.

---

## 📥 External APIs and System Calls

The **Poll phase** interacts with:

- Incoming client requests
- Disk or network I/O
- Internal modules: `fs`, `http`, `crypto`, etc.
- External APIs or system layers (like the OS)

---

## 🧠 Callback Queues

Each phase has a **queue** where its respective callbacks wait.

- Once the phase is active, all queued callbacks are executed **sequentially**.
- If the queue is empty, it moves to the next phase.

---

## 🔁 Loop Flow Summary

```text
       +--------+         +--------+
       | Timers | ---->   |  Poll  | ----> I/O, fs, http, crypto
       +--------+         +--------+
            ↓                  ↓
       +--------+         +--------+
       | Check  | <----   | Close  |
       +--------+         +--------+

      ↻ Between every phase:
        - process.nextTick()
        - Promise microtasks
```

## overall SUMMARY

```text
🔁 Event Loop Phase | Callback Types Handled
--------------------|-----------------------------
⏲️ Timers           | setTimeout, setInterval
📥 Poll             | fs.readFile, http.get
⚡ Check            | setImmediate
🔒 Close Callbacks  | socket.on("close")
🧬 Microtasks Queue | process.nextTick, Promises

```

⚠️⚠️⚠️ 👇 v. v. v. Important 👇 ⚠️⚠️⚠️

### Real world Example for understanding internal LibUV

```js
// A
https.get(
  "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/global-shark-attack/records?limit=20&refine=date%3A%222023%2F08%22",
  (res) => {
    console.log("A : HTTP request called");
  }
);

// B
setImmediate(() => console.log("B : setImmediate called"));

// C
fs.readFile("./useMe.txt", "utf8", (err, data) => {
  console.log("C : readfile called");
});

function multiplyFn(x, y) {
  return "E : MultiplyFn called";
}

// D
setTimeout(() => {
  console.log("D : setTimeout called");
}, 5000);

// E
console.log(multiplyFn(a, b));
```

here i've mentioned A,B,C,D,E for each js executable lines.

🔍 Step-by-Step Execution Flow

Phase 1: Initial Execution (Call Stack)

// 1. https.get() is called
// - Creates HTTP request
// - Registers callback (stored internally, NOT in callback queues yet)
// - Request sent to network thread pool

// 2. setImmediate() is called
// - Callback queued to CHECK phase
// - Added to setImmediate queue

// 3. fs.readFile() is called
// - Request sent to thread pool
// - Callback will be queued to POLL phase when complete

// 4. setTimeout() is called
// - Timer created with 5000ms delay
// - Callback queued to TIMER phase (after 5 seconds)

// 5. multiplyFn() called and result logged immediately
console.log("E : MultiplyFn called"); // Executes FIRST!

Phase 2: Event Loop Starts
🔄 The LibUV Event Loop Phases

```text
  ┌───────────────────────────┐
┌─┤        TIMERS             ├──┐    ← setTimeout, setInterval
│ └───────────────────────────┘  │
│ ┌───────────────────────────┐  │
├─┤     PENDING CALLBACKS     ├──┤    ← I/O callbacks except close callbacks
│ └───────────────────────────┘  │
│ ┌───────────────────────────┐  │
├─┤        IDLE, PREPARE      ├──┤    ← Internal use only
│ └───────────────────────────┘  │
│ ┌───────────────────────────┐  │
├─┤         POLL              ├──┤ ← I/O callbacks, incoming connections
│ └───────────────────────────┘  │
│ ┌───────────────────────────┐  │
├─┤        CHECK              ├──┤ ← setImmediate callbacks
│ └───────────────────────────┘  │
│ ┌───────────────────────────┐  │
└─┤    CLOSE CALLBACKS        ├──┘    ← close events (socket.on('close'))
  └───────────────────────────┘
```

📈 Expected Output Order

E : MultiplyFn called // result logged immediately

after then callstack will be empty then responses from callback present on callback queue will start pushing to callstack........

C : readfile called // File I/O usually faster
A : HTTP request called // depends on Network speed (poll phase), if network would be slow then it's possible that it can executed very late also 😉
B : setImmediate called // CHECK phase always after POLL
D : setTimeout called // after 5 second complete of timer phase, can't say after which exactly it will be printed, will be printed when timer will complete that's it !!!!
