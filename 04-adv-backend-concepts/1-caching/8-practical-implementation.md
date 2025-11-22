# ✅ **STEP 1 — Install Redis + ioredis**

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

# ✅ **STEP 2 — Create Redis Client (1 file only)**

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

# ✅ **STEP 3 — Create Cache Helper (3 functions only)**

`/utils/cache.js`

```js
const { redis } = require("../config/redisClient");

const setCache = async (key, value, ttl = 3600) => {
  try {
    await redis.set(key, JSON.stringify(value), "EX", ttl);
  } catch (error) {
    console.error("Error setting cache:", error);
  }
};

const getCache = async (key) => {
  try {
    const data = await redis.get(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error getting cache:", error);
    return null;
  }
};

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

# ✅ **STEP 4 — Add Caching to Product List Route**

Inside your product controller:

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

# ✅ **STEP 5 — Add Caching to Product Detail Route**

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

# ✅ **STEP 6 — Add Caching to User Cart + Invalidation**

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

# ✅ **STEP 7 — Add Caching to Orders + Invalidation**

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

# 🚀 **HOW YOU TEST**

Run your server → hit `/products` twice:

First call:

```
CACHE MISS
```

Second call:

```
CACHE HIT
```

Same for:

- `/products/:id`
- `/cart`
- `/orders`

---
