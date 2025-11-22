# Common Redis Pitfalls

## 1. Forgetting Invalidation

Result: users see stale data.

## 2. Using KEYS in production

KEYS blocks Redis and freezes app.
Use SCAN or track keys manually.

## 3. Storing HUGE objects

Causes memory issues.

## 4. Cache Stampede

Too many requests hit DB at once when cache expires.
Fix: stagger TTL with randomness.

## 5. Relying on Redis 100%

If Redis goes down, app should still work → fallback to DB.
