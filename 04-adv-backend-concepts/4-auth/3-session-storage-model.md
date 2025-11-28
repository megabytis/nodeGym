**Purpose:** Store refresh tokens and session metadata so the server can revoke and manage sessions.

**Minimal session document (MongoDB example):**

```js
{
  _id: ObjectId,
  userId: ObjectId,
  refreshToken: String,
  userAgent: String,
  ip: String,
  createdAt: Date,
  expiresAt: Date,
  valid: Boolean // set to false on logout
}
```

**Why store sessions?**

* Allow logout from single device (invalidate single session).
* Implement logout from all devices (invalidate many sessions).
* Detect suspicious devices (different userAgent/IP).

**Operations you will need:**

* Create session on login.
* Find session by refresh token during refresh.
* Mark session invalid on logout.
* Delete all sessions for logout-all.
* Rotate refresh tokens (update refreshToken and expiresAt on use).

**Indexes:**

* Index on `refreshToken` for quick lookup.
* Index on `userId` for listing or deleting sessions.