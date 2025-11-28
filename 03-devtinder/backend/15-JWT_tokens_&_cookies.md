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
// Example Payload(claims) :--
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

# Now Let's create JWT token & Cookie !

    - first of all when in /login API email & finally password will match then we'll create a JWT token & insert the token to Cookie & then send the response back. 👇

```js
if (isPasswordSame) {
  // if password is valid then ;

  // STEP-1
  // Create a JWT token

  // syntax :-
  // jwt.sign(payload(can be user email or user's DB _id), secretOrPrivateKey, [options, callback])

  /* e.g.:
    const token = jwt.sign(
        { id: user._id, email: user.email }, // payload
        process.env.JWT_SECRET,              // secret key
        { expiresIn: "1h" }                  // options
    );
  */
  const token = await jwt.sign({ _id: foundUserData._id }, "#MyDevT1nder----"); // we can add expiry of the token here also, see Syntax for more info

  // STEP-2
  // Add the token to Cookie & then send the response back

  // syntax :-
  // res.cookie(token_name, value, [options])

  /* e.g. :
    res.cookie("token", token, {
        httpOnly: true,                  // can't be accessed by JS (secure)
        secure: process.env.NODE_ENV === "production", // only on HTTPS in prod
        sameSite: "strict",              // CSRF protection
        maxAge: 1000 * 60 * 60           // 1 hour
        partitioned: true, <- for mordern Chrome
    });
  */
  res.cookie("token", token);
  // we can add many more options also here in cookie, refer to syntax

  res.send("Login Successful!");
}
```

    - Now cookie is sent to user's browser .
    - Now whenever user will perform any other request to the same server, this cookie will again being validated.
    - here is the code 👇

```js
app.get("/profile", async (req, res, next) => {
  try {
    // whatever cookie has been created & sent to user's browser, we'll collect that here
    const cookies = req.cookies;

    // then, extract the token from the cookie, that we have created,
    const { token } = cookies;

    if (!token) {
      throw new Error("Token is not valid!");
    }

    // Now using that token & secretKey, we'll verify wheather it is Valid or not
    // If valid then jwt.verify won't return BOOLEAN rather than it will return our Payload that we've given during creating jwt token.

    // syntax :-
    // jwt.verify(token, secretOrPublicKey, [options, callback])

    const decodeToken = await jwt.verify(token, "#MyDevT1nder----");
    const { _id } = decodeToken;

    console.log(`User DB id is : ${_id}`);

    const user = await UserModel.findById(_id);
    if (!user) {
      throw new Error("User not present!");
    }

    res.send(user);
  } catch (err) {
    next(err);
  }
});
```

    - We can't console log that cookie, for that we'll need 'cookie-parser' an npm package & create a middleware using that cookiparser.
    - like this 👇

```js
const cookieParser = require("cookie-parser");
app.use(cookieParser());
```

# Best Practices to Follow! :

    - Although, just writing as it is will also run smotthly, no problem. Still ;
    - Besides of creating token inside /login API (like; await jwt.sign({ _id: foundUserData._id }, "#MyDevT1nder----");), for Best Practices, create it as a "Schema Method", where we have written our Schema.
    - It is called "OFF-Loading" anything from one place to another.

```js
userSchema.methods.getJWT = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, "#MyDevT1nder----", {
    expiresIn: "10s",
  });
};
```

    - ⚠️ Important ⚠️ : don't write Arrow method for definign schema method, some problems might happen bcuz, of using 'this' keyword.
    - here i have defined 'user' as 'this', cuz 'this' will refer to the Object which would be created using the Schema & will be stored as a Document inside DataBase.
    - now a new method named 'getJWT' has been created under userSchema.
    - now inside /login API i just have to call this method using the schema's Object.

```js
const token = await foundUserData.getJWT();
```

    - like this, we can offload password validating stuff also from /login API section to Schema declaration page .

    - That's it , Enjoy! 🥳
