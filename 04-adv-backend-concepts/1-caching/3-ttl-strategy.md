# TTL (Time-To-Live) Strategy

TTL controls how long data stays in Redis before auto-deleting.

## Why TTL is important

- Avoids stale/outdated responses.
- Controls memory usage.
- Lets you avoid complex manual invalidation for rarely-changing data.

## Recommended TTLs

- Product list → 30–120 seconds
- Product detail → 120–300 seconds
- Cart → 30–60 seconds (frequent changes)
- Orders → 5–10 minutes
- Search results → 30 seconds

## Rule of Thumb

Short TTL if:

- Data changes often

Long TTL if:

- Data is mostly static
