## How libuv Talks to the OS in Node.js (Story Mode)

**1. JavaScript code**

```js
const http = require("http");

http
  .createServer((req, res) => {
    res.end("Hello World");
  })
  .listen(3000);
```

I tell Node.js: “Start a server on port 3000.”  
Node.js passes this to **libuv**, its behind-the-scenes I/O manager.

---

**2. libuv — the operations manager**  
libuv is a C library that handles **asynchronous I/O**.  
It knows how to talk to the OS directly and efficiently.  
It says: “I need a **socket**.”

---

**3. Socket — the communication line**  
A **socket** is like a phone line between two programs.

- Has an **IP address** and **port number**.
- Used to send/receive data over the network.

When created, the socket is just a **file descriptor** (FD).

> **FD (File Descriptor)** = A number the OS uses to track an open file, socket, or pipe.

---

**4. Registering with epoll (Linux) / kqueue (macOS)**  
libuv tells the OS:

> “Here’s my socket FD. Let me know when there’s activity.”

The OS uses:

- **epoll** on Linux
- **kqueue** on macOS  
  These are **scalable I/O event notification systems** — like bouncers who only alert you when there’s something worth handling.

---

**5. Waiting phase**  
libuv calls `epoll_wait()` (or `kevent()` on macOS).  
This means Node.js **sleeps** until the OS says “something happened.”

---

**6. A request arrives**

- Browser sends an HTTP request to my IP:3000.
- The **kernel** (OS core) receives the packet and stores it in the **socket buffer**.
- epoll tells libuv: “FD #7 is ready to read.”

---

**7. Reading the request**  
libuv uses the `read()` syscall to grab the bytes from the socket buffer.  
Node.js’s `http` module parses the bytes into a `req` and `res` object.

---

**8. My JavaScript runs**  
My callback executes, e.g.:

```js
res.end("Hello World");
```

This queues data for writing.

---

**9. Writing the response**  
libuv tells epoll: “Notify me when FD #7 is ready for writing.”  
When ready, libuv uses `write()` to send my response back through the kernel → network → browser.

---

**10. Loop repeats**  
The event loop keeps running:  
Wait for OS event → Process in Node.js → Write response → Wait again.

---

### Summary Flow

1. JS code → Node.js core → libuv.
2. libuv creates socket (FD).
3. Registers FD with epoll/kqueue.
4. OS watches and notifies libuv when ready.
5. libuv reads/writes data via syscalls.
6. Node.js modules process the data and call my JS.
7. Repeat without blocking.
