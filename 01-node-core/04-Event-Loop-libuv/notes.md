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

## [🖼️ Image Reference](./nodeJs.png)

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

# Event-Loop in detail (with diagram)

[event-loop](./event_loop.png)
