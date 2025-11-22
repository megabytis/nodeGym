# Cache-Aside Pattern (What + When + Why)

Cache-Aside = "Check cache first; if miss, get from DB and save to cache."

## Why It's Needed

MongoDB calls are slow under load.  
Cache-aside reduces DB hits drastically.

## When To Use It

- Product list
- Product details
- User dashboards
- Order history
- Any read-heavy endpoint

## Flow

1. Receive request.
2. Check Redis: any data for this key?
3. If yes → return cached data.
4. If no → hit DB → store data in Redis → return DB data.

## Advantages

- Simple to implement
- Good control over invalidation
- Works perfectly for read-heavy apps

## Disadvantages

- First request (cache miss) is still slow
