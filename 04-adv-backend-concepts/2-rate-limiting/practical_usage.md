```js
// /utils/rateLimiter.js
const RateLimit = require("express-rate-limit");
const RedisStore = require("rate-limit-redis");
const Redis = require("ioredis");

// connecting to Redis cloud
const redisClient = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
});

// ***Now we can create multiple rate limiters according to our need***

// generic IP-based limiter (public APIs)
const publicLimiter = RateLimit({
  store: new RedisStore({
    sendCommand: (...args) => redisClient.call(...args),
  }),
  windowMs: 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests. Try again later." },
  handler: (req, res) => {
    res.status(429).json({ error: "Too many requests. Try again later." });
  },
  keyGenerator: (req) => req.ip,
  draft_polli_ratelimit_headers: true,
});

// stricter limiter for auth endpoints (login)
const authLimiter = RateLimit({
  store: new RedisStore({
    sendCommand: (...args) => redisClient.call(...args),
  }),
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per IP per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many login attempts. Try after 15 minutes." },
  handler: (req, res) =>
    res
      .status(429)
      .json({ error: "Too many login attempts. Try after 15 minutes." }),
  keyGenerator: (req) => req.ip,
  draft_polli_ratelimit_headers: true,
});

// user-specific higher limits (for authenticated users) example
const userLimiter = (opts = {}) => {
  // opts: { windowMs, max }
  return RateLimit({
    store: new RedisStore({
      sendCommand: (...args) => redisClient.call(...args),
    }),
    windowMs: opts.windowMs || 60 * 1000,
    max: opts.max || 200,
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req) => {
      // prefer user id if logged in else ip
      if (req.user && req.user._id) return `user:${String(req.user._id)}`;
      return req.ip;
    },
    handler: (req, res) =>
      res.status(429).json({ error: "Rate limit exceeded." }),
    draft_polli_ratelimit_headers: true,
  });
};

module.exports = { redisClient, publicLimiter, authLimiter, userLimiter };
```
