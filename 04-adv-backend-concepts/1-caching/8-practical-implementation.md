# **STEP 1 — Install Redis + ioredis**

Run this:

```bash
npm install ioredis
```

If using Redis Cloud → grab the connection URL.

If using local Redis via Docker:

```bash
docker run -p 6379:6379 --name redis redis:latest
```

---

# **STEP 2 — Create Redis Client (1 file only)**

`/config/redisClient.js`

```js
const Redis = require("ioredis");

const redisConfig = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
};

const redis = new Redis(redisConfig);

redis.on("error", (err) => {
  console.error("Redis connection error:", err);
});

redis.on("connect", () => {
  console.log("Connected to Redis");
});

module.exports = { redis };
```

That’s your connection done.

---

# **STEP 3 — Create Cache Helper (3 functions only)**

`/utils/cache.js`

```js
const { redis } = require("./config/redisClient");

// ###################################
// 1. redis.set(key, value, [options])
// ##################################
// Purpose: Stores a key-value pair in Redis with optional expiration.
// Syntax: await redis.set(key, value, "EX", ttl);

/*
Parameters:
key (string): The identifier for your data
value (string): The data to store (must be stringified if it's an object)
"EX" (string): Sets expiration time in seconds
ttl (number): Time To Live in seconds
*/

// Example usage
// await redis.set("user:123", JSON.stringify({ name: "John", age: 30 }), "EX", 3600);

// This creates:
// Key: "user:123"
// Value: '{"name":"John","age":30}' (stringified JSON)
// Expires: After 3600 seconds (1 hour)

/*
Alternative expiration options:
// EX - seconds
await redis.set("key", "value", "EX", 60); // 60 seconds

// PX - milliseconds  
await redis.set("key", "value", "PX", 60000); // 60,000 ms = 60 seconds

// NX - only set if key doesn't exist
await redis.set("key", "value", "NX");

// XX - only set if key already exists
await redis.set("key", "value", "XX");
*/

const setCache = async (key, value, ttl = 3600) => {
  try {
    await redis.set(key, JSON.stringify(value), "EX", ttl);
  } catch (error) {
    console.error("Error setting cache:", error);
  }
};

// #################
// 1. redis.get(key)
// #################
// Purpose: Retrieves a value from Redis by key.
// Syntax: await redis.get(key);

// How it works:
/*
// If key exists
const data = await redis.get("user:123");
// Returns: '{"name":"John","age":30}' (string)

// If key doesn't exist or expired
const data = await redis.get("nonexistent");
// Returns: null

// You need to parse it back to object
const user = JSON.parse(data); // { name: "John", age: 30 }
*/

/*
Important:
- Always returns a string or null
- You need to manually parse JSON strings back to objects
- Returns null if key doesn't exist or has expired
*/

const getCache = async (key) => {
  try {
    const data = await redis.get(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error getting cache:", error);
    return null;
  }
};

// #################
// 3. redis.del(key)
// #################
// Purpose: Deletes one or more keys from Redis.

// Syntax:
/* 
await redis.del(key);
// or for multiple keys;
await redis.del(key1, key2, key3);
*/

// How it works:
/*
// Delete single key
await redis.del("user:123");
// Returns: 1 (number of keys deleted)

// Delete multiple keys
await redis.del("user:123", "session:456", "cache:789");
// Returns: 3 (number of keys deleted)

// Try to delete non-existent key
await redis.del("nonexistent");
// Returns: 0 (no keys deleted)
*/

// Return value:
// Returns the number of keys that were successfully deleted
// Returns 0 if none of the specified keys existed

const removeCache = async (key) => {
  try {
    await redis.del(key);
  } catch (error) {
    console.error("Error removing cache:", error);
  }
};

module.exports = { setCache, getCache, removeCache };
```

This gives you:

- `getCache()`
- `setCache()`
- `removeCache()`

No more functions needed.

---

# **STEP 4 — Add Caching to Product List Route**

Logic :

    - getCache(key) → if miss → fetch from DB → setCache(key, data, ttl)
    - Use removeCache(key) immediately after updating DB.

Inside product controller:

```js
// GET /products?page=1&limit=10
export const getProducts = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const key = `products:list:page=${page}:limit=${limit}`;

  const cached = await getCache(key);
  if (cached) {
    console.log("CACHE HIT:", key);
    return res.json(cached);
  }

  const skip = (page - 1) * limit;

  const data = await Product.find().skip(skip).limit(limit).lean();

  await setCache(key, data, 60); // TTL 60s

  res.json(data);
};
```

Boom — product list cached.

---

# **STEP 5 — Add Caching to Product Detail Route**

```js
export const getProduct = async (req, res) => {
  const { id } = req.params;
  const key = `product:${id}`;

  const cached = await getCache(key);
  if (cached) {
    console.log("CACHE HIT:", key);
    return res.json(cached);
  }

  const product = await Product.findById(id).lean();

  await setCache(key, product, 120); // TTL 2 mins

  res.json(product);
};
```

---

# **STEP 6 — Add Caching to User Cart + Invalidation**

### 📌 GET Cart (cached)

```js
export const getCart = async (req, res) => {
  const userId = req.user._id;
  const key = `cart:${userId}`;

  const cached = await getCache(key);
  if (cached) {
    console.log("CACHE HIT:", key);
    return res.json(cached);
  }

  const cart = await User.findById(userId)
    .select("cart")
    .populate("cart.productId")
    .lean();

  await setCache(key, cart, 60);

  res.json(cart);
};
```

### 📌 On add/remove/update cart → DELETE CACHE

Wherever you update cart:

```js
await cache.del(`cart:${req.user._id}`);
```

---

# **STEP 7 — Add Caching to Orders + Invalidation**

### 📌 GET Orders (cached)

```js
export const getOrders = async (req, res) => {
  const userId = req.user._id;
  const key = `orders:${userId}`;

  const cached = await getCache(key);
  if (cached) {
    console.log("CACHE HIT:", key);
    return res.json(cached);
  }

  const orders = await Order.find({ userId }).lean();

  await setCache(key, orders, 300); // 5 minutes

  res.json(orders);
};
```

### 📌 On order creation → delete key

```js
await removeCache(`orders:${req.user._id}`);
```

---

# Thumb Rule

GET routes → getCache + setCache
POST / PATCH / PUT / DELETE routes → removeCache
