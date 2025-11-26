# Rate Limiting

Rate limiting is a technique used in backend APIs to **control how many requests a user/client can make in a specific amount of time**.

It protects your server from:

- abuse
- spam
- brute-force login attempts
- DDoS-like heavy usage
- accidental infinite loops from buggy frontend code
- expensive repeated queries (e.g., `/search` spam)

---

# Why do we need Rate Limiting?

## 1. **Prevent brute-force attacks**

Attackers try thousands of login attempts:

```
email + common passwords
```

Rate limiting blocks them quickly.

---

## 2. **Prevent API spam**

Some endpoints are heavy (search, product filters).
Without limits, one user can consume all your server resources.

---

## 3. **Control traffic**

If your backend is on a small server (Render free tier),
you DON’T want people hitting endpoints 3000 times per minute.

Rate limiting keeps traffic stable.

---

## 4. **Protect your database**

MongoDB queries are expensive.
Heavy `/products` or `/search` hits can slow the whole system.

Rate limiting reduces load → faster site.

---

# Where is Rate Limiting used?

Below are **real-life examples**:

---

## ✔ 1. Login & Signup routes

Most important.

Limit example:

```

5 attempts per 15 minutes

```

Prevents brute-force.

---

## ✔ 2. Search routes

Search endpoints are heavy.
Limit example:

```

30 searches per minute

```

---

## ✔ 3. Product listing (public APIs)

Even normal routes like `/products` can be spammed.

Limit example:

```

60 req/min per IP

```

---

## ✔ 4. OTP / Email verification

People can spam OTP requests.
Limit:

```

3 OTP sends per hour

```

---

## ✔ 5. Contact forms / Support forms

Prevents bots from spamming.

---

## ✔ 6. Global API limit

General global limiter:

```

1000 req per 10 minutes per IP

```

---

# How Rate Limiting Works

Think of it like a **water bucket**.

## Bucket = limit window time

(e.g., 1 minute)

## Water drops = API requests

(e.g., 60 drops allowed)

## When bucket is full → requests are blocked (HTTP 429 Too Many Requests)

After time window resets → bucket becomes empty → requests allowed again.

---

# How do we add Rate Limiting in Node.js?

We use these 3 things:

1. **express-rate-limit**
   → the actual limiter logic

2. **rate-limit-redis**
   → stores counters inside Redis

3. **ioredis**
   → connects to your Redis Cloud database

---

# Types of Rate Limiting You Will Use

## 1. **IP-based limit** (for public users)

Good for:

- `/products`
- `/search`

Example:

```

60 requests per minute per IP

```

---

## 2. **User-based limit** (for logged-in users)

Uses:

```

user:${userId}

```

Good for:

- `/orders`
- `/wishlist`
- `/profile`

---

## 3. **Strict limit (auth routes)**

Good for:

- `/login`
- `/signup`
- `/otp`
- `/reset-password`

Example:

```

5 requests per 15 minutes

```

---

# 🚨 What happens when limit is exceeded?

Express returns:

**Status: 429 Too Many Requests**

```json
{
  "error": "Too many requests. Try again later."
}
```

Browser also receives:

```
RateLimit-Limit: 60
RateLimit-Remaining: 0
RateLimit-Reset: 58
```

Frontend can use these headers to show cooldown to user.

---

# ow limits are stored?

Using Redis:

- Redis creates a key like:

```
rate-limit:ip:103.122.33.12
```

or

```
rate-limit:user:64b9d23...
```

- It stores:

  - count of requests
  - expiry timestamp

Redis auto resets key after the time window ends.

---

# Important Concepts

## ✔ **Window**

Time period for counting requests.
Example:

```
windowMs: 60 * 1000  → 1 minute
```

---

## ✔ **Max**

Maximum requests allowed in the window.
Example:

```
max: 60
```

---

## ✔ **Key Generator**

Decides WHO is being limited.

- Usually `req.ip`
- Or logged-in userId

---

## ✔ **Store**

Where limits are saved.
For production → **Redis**
For local → in-memory

---

# ✔ Real example: Login limiter

```
5 attempts / 15 minutes
```

If someone fails 5 times, block the IP for 15 minutes.

---

# ✔ Real example: Search limiter

```
30 searches per minute
```

Protects database from overuse.

---

# ✔ Real example: All public APIs

```
max: 100 req/min per IP
```

Protects your site from bots.

---

# ✔ Real example: High-performance user routes

```
200 req/min per user
```

Good for large pages like dashboards.

---

# Best Practices (must follow)

### ✔ Always use Redis for production

Express memory store resets on server restart.

---

### ✔ Use strict limits on login & OTP routes

These are attack targets.

---

### ✔ Don’t use the same limit for ALL routes

Product listing and login are VERY different.

---

### ✔ Always return 429 JSON with error message

Frontend should show:

```
"Wait 1 minute before trying again"
```

---

### ✔ Don’t apply rate limit to images, CSS, static files

Browsers spam static assets.

---

### ✔ Use `keyGenerator` for logged-in users

`req.user._id` is more reliable than IP for authenticated users.

---

# Summary

Rate limiting:

- **Protects APIs**
- **Prevents spam & brute-force**
- **Reduces server load**
- **Uses Redis to store request counts**
- **You apply it per-route based on sensitivity**
- **GET routes = normal limits**
- **LOGIN/OTP routes = very strict limits**
