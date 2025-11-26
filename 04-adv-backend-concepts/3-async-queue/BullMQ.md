# BullMQ (Modern v5+)

BullMQ is a **Redis-based job queue system** for running background tasks in Node.js.

It is used to move heavy work **outside API routes** so our backend stays fast.

---

## Why use BullMQ?

Use it when a task is:

- slow
- blocking
- CPU-heavy
- depends on external APIs
- should run in background

**Examples:**

- sending emails
- generating PDF invoices
- processing orders
- updating analytics
- notifications
- scheduled tasks (cron)

---

# Core BullMQ Classes

## 1. Queue (Producer)

**What:** A Queue is where you **add** jobs from your API.

**Why:** Lets your Express route stay fast while heavy tasks run in background.

**Example:**

```js
const { Queue } = require("bullmq");

const orderQueue = new Queue("orderQueue", {
  connection: {
    host: "localhost",
    port: 6379,
  },
});

await orderQueue.add("processOrder", { orderId: 123 });
```

---

## 2. Worker (Consumer)

**What:** A Worker **processes** the jobs added to the queue.

**Why:** Moves slow tasks OFF the main API thread.

**Note:** Workers should ideally run in a separate process (or at least separate file) to not block the web server.

**Example:**

```js
const { Worker } = require("bullmq");

const worker = new Worker(
  "orderQueue",
  async (job) => {
    console.log("Working on job:", job.data);
    // Do heavy lifting here...
  },
  {
    connection: { host: "localhost", port: 6379 },
  }
);
```

---

## 3. QueueEvents (Listener)

**What:** Listen for job lifecycle events (completed, failed, etc).

**Why:** Useful for logging, real-time progress updates, or debugging.

**Example:**

```js
const { QueueEvents } = require("bullmq");
const events = new QueueEvents("orderQueue", { connection: redisConfig });

events.on("completed", ({ jobId }) => console.log(`Job ${jobId} done!`));
events.on("failed", ({ jobId, failedReason }) =>
  console.log(`Job ${jobId} failed: ${failedReason}`)
);
```

---

# Key Features & Options

## 1. Job Options (Retries, Backoff, Delay)

**What:** Settings for how a job behaves.

**Example:**

```js
queue.add(
  "email",
  { email: "a@gmail.com" },
  {
    attempts: 3, // Retry 3 times if it fails
    backoff: {
      type: "exponential",
      delay: 5000, // Wait 5s, then 10s, then 20s...
    },
    delay: 10000, // Wait 10s before starting
    removeOnComplete: true, // Auto-delete from Redis when done
  }
);
```

## 2. Concurrency

**What:** Process multiple jobs in parallel.

**Why:** Faster processing when workload is high.

**Example:**

```js
new Worker("orderQueue", handler, { concurrency: 5 });
```

## 3. Repeatable Jobs (Cron)

**What:** Run jobs on a schedule.

**Example:**

```js
queue.add(
  "dailyReport",
  {},
  {
    repeat: { pattern: "0 0 * * *" }, // Run at midnight every day
  }
);
```

---

# ⚠️ Important: Stalled Jobs & Scheduler

**Note:** In older versions of BullMQ, you needed a `QueueScheduler`. **In modern versions (v5+), this is NOT needed.**

- **Stalled Jobs:** Detected automatically by Workers.
- **Delayed Jobs:** Handled automatically by the Queue.

---

# Putting It Together — Minimal Real Setup

## `src/config/queue.js` (Shared Config)

```js
const redisConnection = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
};
module.exports = { redisConnection };
```

## `src/queues/emailQueue.js` (Producer)

```js
const { Queue } = require("bullmq");
const { redisConnection } = require("../config/queue");

const emailQueue = new Queue("emailQueue", { connection: redisConnection });

const sendEmailJob = async (data) => {
  await emailQueue.add("send-email", data, {
    attempts: 3,
    removeOnComplete: true,
  });
};

module.exports = { sendEmailJob };
```

## `src/workers/emailWorker.js` (Consumer)

```js
const { Worker } = require("bullmq");
const { redisConnection } = require("../config/queue");

const emailWorker = new Worker(
  "emailQueue",
  async (job) => {
    console.log(`Sending email to ${job.data.email}...`);
    // Actual email sending logic here
    // await sendEmail(job.data);
  },
  {
    connection: redisConnection,
    concurrency: 2,
  }
);

console.log("Email Worker Started...");
```

---

# How It Flows

1.  **API Request:** User hits `/signup`.
2.  **Producer:** API calls `sendEmailJob({ email: "user@test.com" })`.
3.  **Queue:** Job is saved to Redis. API responds immediately (Fast!).
4.  **Worker:** Detects new job in Redis.
5.  **Process:** Worker sends the email in the background.
6.  **Finish:** Job marked as completed and removed.
