```js
const express = require("express");
const app = express();
const port = 3292;

// Request Handler
/*
syntax :---
app.use(route, route-handler) {
    response....
}
-------------OR--------------
app.use(route, route-handler-1, route-handler-2,....) {
    response....
}
--------------OR------------
app.use(route, [route-handlers], more-route-handler,....) {
    response....
}
*/
app.use((req, res) => {
  res.send("Hello, from local Server");
});

// Request handlers using route
app.use("/Secret", (req, res) => {
  // This () => {} function inside 'use()' is known as 'Route-Handler'
  res.send("U r on a Secret Server");
});

app.use("/home", (req, res) => {
  res.send("Welcome to HomePage");
});

// Server Listener
app.listen(port, () => console.log("Server is running ...."));
```

-> here if i'll go to localhost:3292/, app.use matches any route that starts with / & it will show "Hello, from local Server", obviously , but if i'll go to localhost:3292/home or /Secret it will still show "Hello, from local Server", since all paths starts with / 😄 LoL

-> like this if i'll commentout '/' request handler, after then other request handlers will be visible. so like this, if i'll go to localhost:3292/Secret , Same rule: it matches anything that begins with /Secret & will show "U r on a Secret Server", but after /Secret if i'll go to any far route e.g. localhost:3292/Secret/passwords/blabla it will still show "U r on a Secret Server", cuz the starting of route is /Secret

-> Now i installed postman software & created an account, an workspace there, then used localhost:3292/Secret using GET request API to get the same response like browser

-> previously we knew that using app.use("/Secret") it'll match all routes after '/Secret',
but app.get() will exactly use '/Secret' route, so better to use app.get(), app.post(), app.delete() .
Actually app.use() = app.get() + app.post() + app.delete() everything

```js
// example :-----
app.get("/Secret", (req, res) => {
  res.send("U r on a Secret Server");
});
app.post("/login", (req, res) => { ... });
app.delete("/user/:id", (req, res) => { ... });
```

--> ⚠️IMP⚠️ if i won't write 'res.send("blablabla")', it means user is sending request to server but, server isn't responding back. so it will go to an infinite loop for sending request & after sometime req sending will be stopped by timer

### Using multiple Route-Handlers

#### CASE-1

```js
app.get(
  "/node",
  (req, res) => {
    res.send("Response-1");
  },
  (req, res) => {
    res.send("Response-2");
  }
);
```

- here, we'll get only Response-1, cuz js works synchronously line-by-line execution, so after getting request it will send 1st response

#### CASE-2

- But incase there is no response / response not being sent in first route handler, then there is an 'next' param that will be triggred an it will jump to next route handler, then 2nd response will be sent if available. like this goes on..... 👇

```js
app.get(
  "/node",
  (req, res, next) => {
    next();
  },
  (req, res) => {
    res.send("Response-2");
  }
);
```

#### CASE-3

- if inside an request handler we'll send response + write next() ;
- Then 1st response will be printed, then using next() when it will reach to 2nd response, now it will THROW ERROR, cuz one response has already been sent & TCP connection has been closed between user & server, so no further response can't be sent .

```js
app.get(
  "/node",
  (req, res, next) => {
    res.send("Response-1"); // this request only will be sent
    next();
  },
  (req, res) => {
    res.send("Response-2"); // here it will throw error
  }
);
```

#### CASE-4

- If we'll do next() first, then res.send() in first route handler ?

```js
app.get(
  "/node",
  (req, res, next) => {
    next();
    res.send("Response-1"); // here it will throw error
  },
  (req, res) => {
    res.send("Response-2"); // this request only will be sent
  }
);
```

- According to line-by-line js code executionprocess, when next will be triggered it will go to next route parameter, after sending Response-2, it will again come back to res.send() of first req handler, here again it will say ERROR
- cuz, (...same reason as CASE-3...), i.e. TCP/IP connection has been broke btn user & server after Response-2 sent, so another response i.e.Response-1 now can't be sent

**_ These CASE-3 & CASE-4 shouldn't be followed by a Good Developer _**

#### CASE-4

- If we'll just use next() in each route handler till end route handler & won't send any response ?

```js
app.get(
  "/callMe",
  (req, res, next) => {
    next();
  },
  (req, res, next) => {
    next();
  }
);
```

- Then, at the end also it'll search for next route path, but won't find next route handler, so will show path error like; "Cannot GET /callMe"

### Route-Handers as an Array

```js
app.get("/callMe", [
  (req, res, next) => {
    next();
  },
  (req, res, next) => {
    next();
  },
]);
```

-> so finally, we can write route-handlers(rh) in many forms like ;
app.get('path', rh)
app.get('path', rh1, rh2, rh3, rh4......)
app.get('path', [rh1, rh2, rh3])
app.get('path', rh1, rh2, [rh3, rh4], rh5, rh6)
etc....etc....
