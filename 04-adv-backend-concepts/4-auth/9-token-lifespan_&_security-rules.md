**Recommended TTLs:**

* Access Token: 15 minutes (can use 30m if needed)
* Refresh Token: 7 days (or 14/30 days depending on product)
* Session expiry: match RT expiry

**Security rules checklist:**

* Always use `HttpOnly`, `Secure`, `SameSite=Strict` for RT cookie
* Use token rotation
* Store hashed refresh tokens in DB (optional: store raw RT but treat carefully)
* Revoke session on logout
* Invalidate sessions on password change
* Use short AT lifetime for higher security

**Storage & CSRF:**

* With HTTP-only cookie, implement CSRF mitigations if you accept cross-site requests. For SPAs, use SameSite and CORS carefully.