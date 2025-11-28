**What is a Refresh Token (RT)?**

* A long-lived token that the client uses to obtain new Access Tokens without re-authenticating.
* RT should be stored in an HTTP-only secure cookie.

**Why use RT?**

* Keeps UX: users don’t need to re-login every time AT expires.
* Security: keeping RT server-validated lets the server revoke sessions.

**Properties of RT:**

* Long expiry (7–30 days typical).
* Stored in server-side session DB or validated by server.
* Sent only to `/auth/refresh` endpoint (server reads cookie and issues new AT+RT).

**Storage recommendation (frontend):**

* `Set-Cookie: HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=` so JS cannot access it.

**Security rules:**

* Always send RT over HTTPS.
* Use token rotation: issue a new RT when used and invalidate the old one.
* Bind RT to a session: store metadata like `userAgent`, `ip`, `expiresAt`.
