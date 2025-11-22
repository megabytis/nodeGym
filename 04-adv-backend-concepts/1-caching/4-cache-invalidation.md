# Cache Invalidation (When + Why + How)

Invalidation = removing outdated cache so user gets fresh data.

## Why It Matters

Caching is easy.
Invalidation is the REAL skill.

If you don't invalidate:

- Users get stale data
- Wrong prices
- Wrong cart
- Wrong order history

## When To Invalidate

- Product updated → delete `product:{id}`
- Cart changed → delete `cart:{userId}`
- Order placed → delete `orders:{userId}`
- Any CRUD operation → delete related keys

## Strategies

### 1. Direct key deletion (best)

Delete specific keys affected by the change.

### 2. Short TTL (fallback)

If invalidation is complex, use short TTL to auto-refresh.

### 3. Versioned keys (advanced)

Use `product:123:v=15` → increment version on update.
