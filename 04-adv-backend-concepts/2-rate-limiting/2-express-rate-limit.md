# express-rate-limit — Configuration Options

`express-rate-limit` is the middleware that controls how many requests a client can make within a defined time window.

Below are the MOST important options — explained in plain English.

---

# ⭐ 1. `windowMs`

**What it is:**  
How long the rate-limiting window lasts.

**Type:** Number (milliseconds)

**Example:**

```js
windowMs: 60 * 1000; // 1 minute
```

**Meaning:**
Requests are counted for 1 minute. After that, the counter resets.

---

# ⭐ 2. `max`

**What it is:**
Maximum number of requests allowed in the window.

**Type:** Number

**Example:**

```js
max: 60;
```

**Meaning:**
A client can make 60 requests per IP per minute.

---

# ⭐ 3. `message`

**What it is:**
The response that gets sent when the user hits the limit.

**Type:** String or JSON

**Example:**

```js
message: {
  error: "Too many requests. Wait 1 minute.";
}
```

---

# ⭐ 4. `handler`

**What it is:**
Custom function that runs when the rate limit is exceeded.
(Overrides the default `message`.)

**Type:** Function

**Example:**

```js
handler: (req, res) => {
  return res.status(429).json({ error: "Slow down bro." });
};
```

---

# ⭐ 5. `standardHeaders`

**What it is:**
Enables modern RFC-compliant rate limit headers.

**Type:** Boolean

**Example:**

```js
standardHeaders: true;
```

**Meaning:**
Browser/client will receive headers like:

```
RateLimit-Limit
RateLimit-Remaining
RateLimit-Reset
```

---

# ⭐ 6. `legacyHeaders`

**What it is:**
Whether to include old headers (for backward compatibility).

**Type:** Boolean

**Example:**

```js
legacyHeaders: false;
```

Old deprecated headers would be:

```
X-RateLimit-Limit
X-RateLimit-Remaining
X-RateLimit-Reset
```

You generally disable them.

---

# ⭐ 7. `keyGenerator`

**What it is:**
Controls what identifies a client.

**Type:** Function
**Default:** `req.ip`

**Examples:**

### Use IP (default)

```js
keyGenerator: (req) => req.ip;
```

### Use userId for logged-in users

```js
keyGenerator: (req) => req.user?._id || req.ip;
```

This prevents many users behind the same IP from being blocked unfairly.

---

# ⭐ 8. `skip`

**What it is:**
A function that tells the limiter to skip this request entirely.

**Type:** Function returning true/false

**Example:**

```js
skip: (req) => req.user?.role === "admin";
```

Meaning:
Admins bypass rate limit.

---

# ⭐ 9. `skipSuccessfulRequests`

**What it is:**
Only count failed requests (e.g., failed login)

**Type:** Boolean

**Example:**

```js
skipSuccessfulRequests: true;
```

**Meaning:**
If login succeeds → counter does not increase.

Useful for login brute-force protection.

---

# ⭐ 10. `skipFailedRequests`

**What it is:**
Ignore failed requests (rarely needed)

**Example:**

```js
skipFailedRequests: true;
```

Not recommended unless you know exactly why you’re doing it.

---

# ⭐ 11. `store`

**What it is:**
Where the request counters are stored.

**Type:** Store adapter (Redis, Memory, etc.)

**Example (Redis):**

```js
store: new RedisStore({
  sendCommand: (...args) => redis.call(...args),
});
```

Without this → uses memory (not good for production).
i.e. it is sayin Don’t store request-counts in memory (Node.js RAM). Instead, use Redis

---

# ⭐ 12. `draft_polli_ratelimit_headers`

**What it is:**
Additional advanced RFC draft headers.

**Type:** Boolean

Example:

```js
draft_polli_ratelimit_headers: true;
```

Enables headers like:

```
RateLimit-Policy
```

Not required but safe to enable.

---

# ⭐ 13. `limit`

Alias for `max`.
(For older versions / legacy code.)

---

# ⭐ 14. `requestWasSuccessful`

Used internally to check if a request succeeded.
(You rarely touch this.)

---

# ⭐ QUICK REFERENCE TABLE

| Option Name                     | Purpose                            | Typical Value            |
| ------------------------------- | ---------------------------------- | ------------------------ |
| `windowMs`                      | Time window for rate limit         | `60*1000`                |
| `max`                           | Max requests allowed               | `60`                     |
| `message`                       | Error response                     | JSON/string              |
| `handler`                       | Custom 429 handler                 | function                 |
| `standardHeaders`               | Enable modern headers              | `true`                   |
| `legacyHeaders`                 | Disable old headers                | `false`                  |
| `keyGenerator`                  | Identify user/IP                   | function                 |
| `skip`                          | Skip limiter for some users/routes | function                 |
| `skipSuccessfulRequests`        | Count only failed ones             | `false`/`true for login` |
| `store`                         | Redis adapter storage              | RedisStore               |
| `draft_polli_ratelimit_headers` | Extended headers                   | `true`                   |

---
