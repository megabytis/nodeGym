# rate-limit-redis

`rate-limit-redis` is **NOT** a rate limiter by itself.

It is only a **storage adapter** that allows `express-rate-limit` to store request counts inside Redis instead of in-memory.

Think of it like this:

- `express-rate-limit` → the policeman
- `rate-limit-redis` → the notebook where the policeman writes who broke the limit
- `ioredis` → the pen used to write into Redis
- `Redis Cloud` → the physical notebook stored in another room (your Redis database)

---

# Why do we need rate-limit-redis?

If you **do not** use `rate-limit-redis`, Express will store rate limit counters in **server RAM**.

This causes major problems:

## ❌ 1. Counters reset when server restarts

(Happens constantly in free-tier hosting)

## ❌ 2. Limits break when you scale horizontally

If you have 2 server instances:

- Instance A sees 10 requests
- Instance B sees 10 requests  
  → User actually did 20 requests  
  → But each instance thinks they did only 10  
  → No proper limiting

## ❌ 3. You can't throttle users consistently

Someone can bypass limits by hitting a different server instance.

---

# rate-limit-redis solves ALL of this

It stores rate limit counters in **Redis**, which is:

- centralized
- shared across all instances
- persistent
- fast

So:

- server restarts won’t reset limits
- all servers read the same counters
- limits are accurate
- no bypassing rate limits
- works perfectly on Render, Railway, Vercel

---

# How rate-limit-redis works

When a user hits an API:

1. express-rate-limit decides  
   → _“Need to count this request”_

2. rate-limit-redis asks Redis:  
   → _“What’s the current count for this user?”_

3. Redis returns something like:

```

requests = 12
expires_in = 42 seconds

```

4. express-rate-limit checks if `requests > max`

5. If exceeded → send error
   If not → store updated count in Redis

So the database is doing the counting, not your local server.

---

# Important Options of rate-limit-redis

### ✔ `sendCommand`

**Required.**
This tells the adapter how to run Redis commands using `ioredis`.

```js
sendCommand: (...args) => redisClient.call(...args);
```

---

### ✔ `prefix`

Used to prefix all Redis keys:

```js
prefix: "rl:";
```

Redis keys will look like:

```
rl:rate-limit:203.122.10.11
```

---

### ✔ `resetExpiryOnChange`

Defaults to **true**.
Controls whether the TTL resets on each increment.

---

### ✔ `client`

Older versions used `client` instead of `sendCommand`.
Ignore; `sendCommand` is modern and correct.

---

# 🧪 What Redis keys look like inside DB

Example key created by the limiter:

```
rl:rate-limit:ip:103.22.44.1
```

With internal data like:

```
count = 24
ttl = 37 seconds
```

---

# When should YOU use rate-limit-redis?

**USE ALWAYS** in production if:

- Your backend runs on Render / Railway / EC2 / Docker clusters
- You might scale to multiple instances
- You want stable rate limits
- You use Redis already (you do)
- Your API is public

**Only skip** if:

- You're writing a toy project
- No external traffic
- Single-instance only
- No plan to scale

For your e-commerce app → **you MUST use it**.

---

# Common Mistakes

## ❌ 1. Only using express-rate-limit without Redis

→ Breaks instantly on Render/Vercel

## ❌ 2. Using in-memory store

→ Rate limits reset every restart

## ❌ 3. Not using `sendCommand` with ioredis

→ Adapter fails

## ❌ 4. Using only IP-based limiter on logged-in users

→ Users behind shared IPs get punished
→ Always use keyGenerator for authenticated routes

---

# Best Practices

### ✔ Use Redis store for ALL rate limits

Login, public APIs, search routes, user dashboards.

### ✔ Don’t overload Redis

Use simple limits → Redis handles millions easily.

### ✔ Combine IP + User ID

```js
keyGenerator: (req) => req.user?._id || req.ip;
```

### ✔ Use different limits per route

Login = strict
Products = moderate
User routes = higher

---

# Summary

- `express-rate-limit` = the limiter
- `rate-limit-redis` = stores counters in Redis
- `ioredis` = connects to Redis Cloud
- You need **all 3** together
- Using Redis makes rate limiting stable, persistent, scalable
- Essential for real deployments (Render/Vercel/Railway)

This is everything you need to deeply understand `rate-limit-redis` and confidently use it.
