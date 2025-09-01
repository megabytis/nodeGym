# Before diving into cookie ;

    - when a user sends request to a server, basically a TCP/IP cnnection being created & after response come back from server to the user, this connection breaks immediately.
    - When user tris to login, server matches user credentials with DataBase, then let user login.
    - but after login whatever user does inside like; let's suppose changing password, making comment, liking posts, sending friend requests etc.. etc... for doing anything, literlly for anything, USER AUTHENTICATION REQUIRED !
    - But after once login, it doesn't ask us for email & pass, then how it Authenticated before doing any task inside it ?
    - here👇 is the detailed explanation

# What happens exactly when user Login ?

    - when user logs-in after giving his/her email & password, server will validate first the email & pass & create a JWT token & send it to a COOKIE.
    - Cookie is a type of Storage Mechanism, which stores the JWT(Json Web Token).
    - NOTE: cookie is just one storage option. We could also use localStorage, but cookie (HTTP-only, secure) is safer.

    - This JWT is very unique, i.e. only for that particular user only. How ? 👇
    - JWT is tied to that user (contains userId, etc.), but uniqueness comes from signing with a secret key(signature), That signature ensures no one can fake/change the token without knowing the secret + Payload(claims)

```json
// Example Palyload(claims) :--
{
  "id": "123",
  "email": "miku@example.com",
  "role": "user",
  "exp": 1712345678 // an expiry claim, so even if someone steals the cookie, it won’t work forever.
}
```

    - That COOKIE is sent to the user & browser stores it.
    - Let's suppose the user makes another req, asuume a PATCH API req for updating something, this time along with request the cookie will also travel to the server & server will check the JWT signature to confirm the request is from a legit user.
    - This is how there would be no need to touch DB again for validating everytime email & pass for Auth.
    - Then response comes.
    - So, from now anytime user will make any type of reuest i.e. user will perform any task inside after logging-in, this is how user authentication will happen 🥵

    - But the cookie is not forever, it is valid till the expiry.
    - When it expires as mentioned in the JWT payload, if browser sends the cookie, Server checks it → sees expired token ❌. Server returns 401 Unauthorized or 403 Forbidden.
    - Now user must login again with email + password → new JWT generated → new cookie issued.

# diagram-style flow :-

**🔑 Login Flow**

```text
 [Client (Browser)]
        |
        |  1. POST /login  { email, password }
        v
    [Server]
        |
        |  2. Check email & password in DB
        v
    [Database]
        |
        |  3. If valid → generate JWT { userId, role } signed with secret
        v
    [Server]
        |
        |  4. Send back JWT inside HTTP-only Cookie
        v
[Client (Browser) stores cookie]

```

**📌 Subsequent Request Flow (after login)**

```text
  [Client (Browser)]
        |
        | 1. User clicks "Update Profile"
        | 2. PATCH /updateProfile  (Cookie auto-attached by browser)
        v
    [Server]
        |
        | 3. Extract JWT from cookie
        | 4. Verify JWT signature with secret key
        |    - If valid → request is authenticated ✅
        |    - If invalid/expired → reject ❌
        v
[Server uses userId from JWT payload to query DB
  (only if needed for data, NOT for password check)]
        |
        v
[Response sent back to client]

```
