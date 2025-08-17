const express = require("express");
const app = express();
const port = 3292;

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

app.get("/user/:userID([a-zA-Z]\\d+)", (req, res) => {
  res.send(req.params);
});

// Server Listener
app.listen(port, () => console.log("Server is running ...."));
