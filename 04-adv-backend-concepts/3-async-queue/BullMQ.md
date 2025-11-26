# BullMQ

BullMQ is a **Redis-based job queue system** for running background tasks in Node.js.

It is used to move heavy work **outside API routes** so our backend stays fast.

---

# 1) Why use BullMQ?

Use it when a task is:

- slow
- blocking
- CPU-heavy
- depends on external APIs
- should run in background

Examples:

- sending emails
- generating PDF invoices
- processing orders
- updating analytics
- notifications
- image compression
- scheduled tasks

---

# 2) Core BullMQ Classes

## ✔ Queue

Used to **add jobs**.  
(Producer)

## ✔ Worker

Used to **process jobs**.  
(Consumer)

## ✔ QueueScheduler

Adds reliability:

- retries
- backoff
- stalled job detection
- delayed jobs

**Required for stable queues.**

## ✔ QueueEvents

Used to listen to events:

- completed
- failed
- waiting
- stalled

## ✔ FlowProducer

Used for complex workflows with child jobs.

---

# 3) How BullMQ Works

1. API adds a job to a Queue
2. Queue stores job in Redis
3. Worker picks job
4. Worker processes it
5. Job marked completed / failed
6. QueueScheduler handles retries and stalled jobs

---

# 4) Key Terms

## Job

The data you want to process in background.

## Queue

A pipe where jobs are pushed.

## Worker

Function that executes job logic.

## Retry

If worker fails → BullMQ retries automatically.

## Backoff

Delay between retries.

## Delay

Wait X ms before running the job.

## removeOnComplete

Auto-delete job after success.

## concurrency

How many jobs worker can run in parallel.

---

# 5) Basic Job Options

```js
{
  attempts: 3,          // retry 3 times
  backoff: 5000,        // wait 5s between retries
  delay: 10000,         // run job after 10s
  removeOnComplete: true,
  removeOnFail: false,
  priority: 1
}
```

---

# 6) When to Use BullMQ

Use BullMQ for any work that **should not** block:

- API response time
- Event loop
- User experience

Example tasks:

- order confirmation emails
- invoice generation
- analytics logs
- admin notifications
- image/video processing
- cron jobs

---

# 7) Architecture Summary

- Queue = adds jobs
- Worker = processes jobs
- QueueScheduler = reliability layer
- QueueEvents = event listeners
- FlowProducer = workflows

Redis is used as the job storage and state manager.

---

# 8) Benefits

- fast
- reliable
- scalable
- retries built-in
- distributed (multiple workers supported)
- supports delay, priorities, concurrency

---

# 9) Simple Flow

```
API → Queue → Redis → Worker → Completed
```

QueueScheduler ensures jobs never get stuck.

> reference : [https://docs.bullmq.io/guide/introduction]
