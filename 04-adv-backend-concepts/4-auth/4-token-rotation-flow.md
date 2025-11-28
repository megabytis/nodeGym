**Goal:** Prevent replay attacks where a stolen RT is reused.

**Rotation steps (safe flow):**

1. Client calls `/auth/refresh` with RT cookie.
2. Server finds session by RT.
3. Server verifies session is valid and RT matches stored value.
4. Server creates a new RT and new AT.
5. Server updates session document with the new RT and new `expiresAt`.
6. Server returns new AT (body) and sets new RT cookie (httpOnly).
7. Old RT is no longer valid.

**Edge cases to handle:**

* If the provided RT is not found → force login (possible theft).
* If the session is marked invalid → reject refresh.
* Use short server-side TTLs to expire sessions eventually.

**Why rotation matters:**

* If an attacker steals RT and the real user uses refresh, the old RT becomes invalid after rotation.
* Prevents replay attacks.