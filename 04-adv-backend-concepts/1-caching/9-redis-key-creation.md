# **THE GOLDEN RULE OF REDIS KEYS**

A key MUST uniquely represent the exact data being cached.

### Format:

```
<resourceName>:<identifier>(optional parts):<content>(optional parts)
```

Redis keys must be:

- Predictable
- Unique
- Small
- Human-readable

---

# **EXAMPLES** (for a shopping Website)

## **1. Product List (Paginated)**

Product list depends on:

- page
- limit
- filters
- sort

So key reflects those:

```
products:list:page=1:limit=10
products:list:page=2:limit=20
products:list:page=3:limit=5:sort=price_asc
```

### Final rule:

```
products:list:page=${page}:limit=${limit}
```

If filters come later:

```
products:list:page=${page}:limit=${limit}:category=${category}
```

---

## **2. Product Details**

One product = one key.

```
product:123
product:64b9cd88297907e88c35f2d5
product:${productId}
```

---

## **3. User Cart**

Each user has exactly ONE cart → easy.

```
cart:${userId}
```

Example:

```
cart:64b9d0f3099c8d3ab65486b1
```

---

## **4. Order History**

Each user’s order history is unique to them.

```
orders:${userId}
```

If you add pagination later:

```
orders:${userId}:page=1
orders:${userId}:page=2
```

---

## **5. Category Pages**

If you ever implement category filters:

```
category:${categoryName}:page=${page}:limit=${limit}
```

Example:

```
category:shoes:page=1:limit=20
```

---

## **6. Search Results (Optional Feature)**

```
search:${query}:page=${page}
```

Example:

```
search:iphone:page=1
search:tshirt:page=2
```

---

# SUPER IMPORTANT (For invalidation)

If product updates:

```
removeCache(`product:${id}`)
removeCache(`products:list:*`)   <-- optional (only if you want)
```

If user updates cart:

```
removeCache(`cart:${userId}`)
```

If user creates order:

```
removeCache(`orders:${userId}`)
```

---

# Final Tool (REUSABLE KEY GENERATOR FUNCTION) 😜

```js
const buildKey = (resource, params = {}) => {
  let key = resource;

  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null) {
      key += `:${k}=${v}`;
    }
  }

  return key;
};

module.exports = { buildKey };
```
