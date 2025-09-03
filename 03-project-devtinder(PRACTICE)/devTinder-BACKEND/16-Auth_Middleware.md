- like i previously created, JWT token Authentication for /profile API, like that it's very crucial to add Authentication inside every API
- That's why now i have to create a Middleware for Authentication and will have to use that Middleware in every API for Auth.
- Token validation/Authentication is not needed for /login & /sign-up API obviously.
- So except /login & /sign-up API, othe APIs need this Auth Middleware
- I Created a /Middleware directory nd placed Auth.js file there.
- Now will write basic auth stuffs there and export it
- example 👇

```js
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    // STEP : 1
    // Reading the token from the request Key
    const { token } = req.cookies;

    if (!token) {
      throw new Error("Token Now Valid!");
    }

    // STEP : 2
    // Validating the Token
    const decodedObj = await jwt.verify(token, "#MyDevT1nder----");
    const { _id } = decodedObj;

    // STEP : 3
    // Finding the user
    const foundUser = await UserModel.findById(_id);

    if (!foundUser) {
      throw new Error("User not found!");
    }

    req.user = foundUser; // here i'm sending the found-user also via req, which now, if needed, i can use inside any API.

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  userAuth,
};
```

- Now will import this "userAuth" middleware in our App, and Pass it to any API, between PATH & async Function, like this 👇

```js
const { userAuth } = require("./middleware/Auth");

app.get("/profile", userAuth, async (req, res, next) => {
  const user = req.user;
  // here i can use the requested user, which i got via authenticating user's JWT token

  res.send(`user : ${user}`);
});
```

- anywhere in the middleware if authentication fails, then it won't let user to access the API / that specific route/path
