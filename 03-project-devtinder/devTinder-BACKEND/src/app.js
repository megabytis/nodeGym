const express = require("express");
const app = express();
const port = 3292;

// Server Listener
app.listen(port, () => console.log("Server is running ...."));

// Request Handler
// Request handlers using route
// GET
app.get("/secret", (req, res) => {
  res.send({
    name: "Madhusudan Bhukta",
    age: 21,
    college: "Utkal University",
  });
});

// POST
app.post("/secret", (req, res) => {
  // Here saving data to DB
  res.send("Data saved successfully in the Server !");
});

// DELETE
app.delete("/secret", (req, res) => {
  res.send("Data deleted successfully");
});

// #############################
// using Multiple Route Handlers
// #############################

app.get(
  "/sendHere",
  (req, res, next) => {
    // res.send("Response-1");
    next();
  },
  (req, res, next) => {
    res.send("Response-2");
  }
);

// #############################################
// Using multiple route-handlers inside an array
// #############################################

app.get("/callMe", [
  (req, res, next) => {
    next();
  },
  (req, res, next) => {
    res.send("Multiple route-handlers in array");
  },
]);

// ####################################################################################
// Using multiple route-handlers inside an array + Then after again more route handlers
// ####################################################################################

app.get(
  "/moreRoutes",
  [
    (req, res, next) => {
      next();
    },
    (req, res, next) => {
      next();
    },
  ],
  (req, res) => {
    res.send(
      "Response from route-handers in array & then again route handlers"
    );
  }
);

// MIDDLEWARE :--------

// Single-used Middleware :--
app.use("/dashboard", (req, res, next) => {
  console.log("middleware");
  next();
});
app.get("/dashboard", (req, res) => {
  console.log("req-handler");
  res.send("dashboard-req-handler");
});

// Multi-Used Middleware :--

function checkAuth(req) {
  return true;
}

const authentication = (req, res, next) => {
  const isAuthenticated = checkAuth(req);
  if (isAuthenticated) {
    console.log("user has been authenticated.");
    next();
  } else {
    res.status(401).send("User not authenticated");
  }
};

// mw-1
app.use("/admin", authentication); // for each /admin/* it will use this current middleware
// mw-2
app.use("/settings", authentication); // for each /settings/*
// mw-3
app.use("/profile", authentication); // for each /profile/*

// route-handlers
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

app.get("/profile/modifyDetails", (req, res, next) => {
  console.log("modifying details");
  res.send("ur acc has been modified");
});
app.get("/profile/checkProfileStatus", (req, res, next) => {
  console.log("checking profile");
  res.send("see ur profile");
});
