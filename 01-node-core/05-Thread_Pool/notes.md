# 🔄 Thread Pool in Node.js (with `libuv`)

## 💡 What is a Thread Pool?

A **Thread Pool** is a collection of background **worker threads** managed by **libuv**. These threads handle **blocking operations asynchronously**, ensuring the **main JavaScript thread doesn't get blocked**.

```js
// ❌ Without thread pool - BLOCKS main thread!
const data = fs.readFileSync("./huge-file.txt"); // Synchronous = blocking

// ✅ With thread pool - NON-BLOCKING
fs.readFile("./huge-file.txt", (err, data) => {
  console.log("File read complete"); // Executes asynchronously
});
```

---

## 🤔 Why Thread Pool Exists

Node.js runs JavaScript in a **single thread**, but blocking operations (like file I/O or DNS lookup) would freeze the entire app.  
**libuv** steps in with a **Thread Pool** to offload such tasks to background threads — keeping the main thread smooth and responsive. 🚀

---

## ⚙️ libuv Thread Pool Architecture

```
┌─────────────────────────────────────────┐
│           Main Thread (V8)              │
│  • JS Execution                         │
│  • Event Loop                           │
│  • Non-blocking I/O                     │
└─────────────┬───────────────────────────┘
              │
┌─────────────▼───────────────────────────┐
│           Event Loop                    │
│  • TIMERS                               │
│  • PENDING CALLBACKS                    │
│  • POLL                                 │
│  • CHECK                                │
│  • CLOSE CALLBACKS                      │
└─────────────┬───────────────────────────┘
              │
┌─────────────▼───────────────────────────┐
│       Thread Pool (Default: 4 Threads)  │
│  ┌─────────────┐ ┌─────────────┐        │
│  │ Thread 1    │ │ Thread 2    │        │
│  └─────────────┘ └─────────────┘        │
│  ┌─────────────┐ ┌─────────────┐        │
│  │ Thread 3    │ │ Thread 4    │        │
│  └─────────────┘ └─────────────┘        │
└─────────────────────────────────────────┘
```

---

## 🛠️ Operations Handled by Thread Pool

- 📁 File System (`fs` module)
- 🌐 DNS Lookups (`dns` module)
- 🔐 Crypto Tasks (`crypto` module)
- 🗜 Zlib Compression (`zlib` module)

---

## 🧮 Thread Pool Size

- 🔧 **Default size**: `4` threads
- ⚙️ Can be changed using:

```bash
UV_THREADPOOL_SIZE=8 node app.js
```

---

## 🧪 How to Check Thread Pool in Action

```js
const fs = require("fs");
const startTime = Date.now();

// Queue 10 read operations (more than default pool size)
for (let i = 0; i < 10; i++) {
  fs.readFile("./test.txt", () => {
    console.log(`Operation ${i} completed in ${Date.now() - startTime}ms`);
  });
}

// You'll see operations finish in batches (4 at a time)
```

---

## 😵 Is Node.js Single-Threaded or Multi-Threaded?

> The classic controversial question 😏

**Answer:** _It depends!_ 🤯

- The **JavaScript execution** and **event loop** are single-threaded.
- But thanks to **libuv**, Node.js is **multi-threaded under the hood** for I/O and background tasks.

So technically, Node.js is **single-threaded for JS**, but **multi-threaded overall** when using the Thread Pool. 💥
