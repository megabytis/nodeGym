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
