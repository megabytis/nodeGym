**What is an Access Token (AT)?**

* A short-lived signed token (JWT) used to authenticate API requests.
* Contains small data: `userId`, `role`, `issuedAt`, `expiry`.

**Why short-lived?**

* If leaked, exposure time is small.
* Limits damage compared to long-lived tokens.

**How it works (flow):**

1. User logs in → server verifies credentials.
2. Server issues an Access Token (e.g., expires in 15m).
3. Client attaches AT to each protected API request in `Authorization: Bearer <token>` header.
4. Server verifies signature and expiry, reads `userId` and `role` from payload and allows access.

**What to include in payload (keep small):**

* `sub` or `userId` (user identifier)
* `role` (user role e.g., "user", "admin")
* `iat` (issued at)
* `exp` (expiry timestamp)

**Where frontend stores AT:**

* In memory (best) or localStorage/sessionStorage (acceptable if non-critical). Avoid storing RT here.

**Security tips:**

* Keep payload minimal. Don’t store passwords or heavy personal info.
* Verify signature with server-side secret or RSA public key.
* Use HTTPS.
