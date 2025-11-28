**Purpose:** Validate Access Token, populate `req.user`.

**Behavior:**

1. Read `Authorization` header: `Bearer <token>`.
2. If token missing → return 401.
3. Verify signature and expiry.
4. If valid → set `req.user = { userId, role }` and call `next()`.
5. If invalid/expired → return 401.

**Error handling:**

* Clear, consistent 401 messages.
* For expired AT → client should call `/auth/refresh-token`.

**Performance tips:**

* Keep payload validation light. Don’t query DB for every request (unless you need fresh user status). Optionally, cache user profile in Redis if needed.