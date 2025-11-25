### MIDDLEWARE

**_ Middleware _**

- They runs for every req URL path which should atleast matches with the MIDDLEWARE's given path
- These r "Helper_functions" that do work but don't send final response
- They always defined with app.use()

**_ Route Handlers _**

- Here req URL path should exactly match with ROUTE-HANDLER path
- These r "Final_functions" that send the response to the user
- They defined with app.get(), app.post(), app.put(), app.delete(), etc.

```js
// 🔧 MIDDLEWARE 1: Logging (runs for ALL requests, cuz every req URL path starts with / )
app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.path}`);
  next(); // MUST call next() to continue!
});

// 🔧 MIDDLEWARE 2: Authentication (runs for /api/* requests only)
app.use("/api", (req, res, next) => {
  console.log("Checking authentication...");
  req.user = "john"; // Add data to request
  next(); // Continue to next handler
});

// 🎯 ROUTE HANDLER 1: Handles GET /
app.get("/", (req, res) => {
  res.send("Welcome to homepage!");
});

// 🎯 ROUTE HANDLER 2: Handles GET /api/users
app.get("/api/users", (req, res) => {
  res.json({ user: req.user, users: ["Alice", "Bob"] }); // Send final response
});
```

#### When to use Middleware ?

- Middleware becomes valuable when you need to do the same thing for multiple routes .
- for single-route operations OR one time use req handlers , Middleware shouldn't be used.
- but it's Always good to write Middleware.
- for e.g. i've created rh, having routes like '/admin/moneyTransfer', '/admin/reqLoan', '/admin/closeAcc' etc.. everything starting with /admin route, so for every RH here, i have to first do AUTHENTICATION LOGIC, to check wheather the user-req is authorized or not
- e.g. 👇

```js
app.get("/admin/moneyTransfer", (req, res, next) => {
  // first writing Logic for checking the request is authorized or not
  res.send("money transfered");
});

app.get("/admin/reqLoan", (req, res, next) => {
  // first writing Logic for checking the request is authorized or not
  res.send("Loan accepted");
});

app.get("/admin/closeAcc", (req, res, next) => {
  // first writing Logic for checking the request is authorized or not
  res.send("Acc closed successfully");
});
```

- here it will check user authentication before going going into any route after "/admin/"
- besides writting same logic or user-req auth for each "/admin/" path in every RH, better to write a separate app.use() having path '/admin', containing all logic for user auth in it, which is the parent path of each routes of the above RHs, that app.use() will be ultimately called MIDDLEWARE
- e.g. :- 👇

```js
// ✅ Real-world Example - Authentication Middleware:

const authentication = (req, res, next) => {
  const token = "d0034sdSe4FCf3f";
  const isAuthenticated = token === "efg123";
  if (isAuthenticated) {
    console.log("user has been authenticated.");
    next();
  } else {
    res.status(401).send("User not authenticated");
  }
};

// mw-1
app.use("/admin", authentication); // for all /admin/* routes it will use this middleware
// mw-2
app.use("/settings", authentication); // for all /settings/* routes
// mw-3
app.use("/profile", authentication); // for all /profile/* routes

// Route-handlers
// Now these routes automatically have authentication!
app.get("/admin/moneyTransfer", (req, res, next) => {
  console.log("moneytransfer-route-handler-called");
  res.send("money transfered");
});

app.get("/admin/reqLoan", (req, res, next) => {
  console.log("loan-accept-req-handler");
  res.send("Loan accepted");
});

app.get("/admin/closeAcc", (req, res, next) => {
  res.send("Acc closed successfully");
});
// They 👆 use the SAME middleware "admin" for multiple routes

app.get("/profile/modifyDetails", (req, res, next) => {
  console.log("modifying details");
  res.send("ur acc has been modified");
});
app.get("/profile/checkProfileStatus", (req, res, next) => {
  console.log("checking profile");
  res.send("see ur profile");
});
// They 👆 use the SAME middleware "profile" for multiple routes
```

- Now the above RHs don't need Auth inside them, cuz their parent route i.e. /admin/, /profile/ already have Auth logic in it, which r being checked everytime whenever user will call these specific routes, so those req handlers having parent paths /admin, /profile inside app.use() r known as MIDDLEWARE.
- Another imp thing is, before processing any specific path it's middleware is being triggered right, so there if Auth fails then it won't let user to enter to the specified requsted path, Amazing 🤩
- Another thig better to write middleware logics in separate midleware directory & then just import 'em .

#### Q. SO, What is middlware ?

- Middleware in Express.js are functions that have access to the request object (req), response object (res), and the next middleware function (next) in the application's request-response cycle.

#### Q. How expressjs basically handles requests bts ?

- 🚀 Request Processing Flow:
  Request arrives at Express server
  Middleware chain executes in order of definition
  Each middleware can:
  Modify req/res
  End response
  Call next() to continue
  Route handler (if matched) executes
  Response sent back to client
