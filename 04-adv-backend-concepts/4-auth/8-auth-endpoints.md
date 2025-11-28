**Endpoints to implement:**

* `POST /auth/register` — create user (returns AT+sets RT cookie)
* `POST /auth/login` — verify creds, create session (AT+RT)
* `POST /auth/refresh` — read RT cookie, rotate and return new AT+RT
* `POST /auth/logout` — invalidate current session, clear RT cookie
* `POST /auth/logout-all` — invalidate all sessions for user
* `GET /auth/me` — return user profile (auth required)

**Request/response patterns:**

* Login response: `{ accessToken }` + `Set-Cookie: refreshToken` (httpOnly)
* Refresh response: `{ accessToken }` + new cookie
* Logout response: `{ message: 'logged out' }` and clear cookie

**Security:**

* Limit login attempts (you already have rate limiter)
* On register: hash passwords with bcrypt, validate inputs