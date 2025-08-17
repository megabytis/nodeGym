const express = require("express");
const app = express();
const port = 3292;

// Request Handler
app.use((req, res) => {
  res.send("Hello, from local Server");
});

// Request handlers using route
app.use("/Secret", (req, res) => {
  res.send("U r on a Secret Server");
});

app.use("/home", (req, res) => {
  res.send("Welcome to HomePage");
});

// Server Listener
app.listen(port, () => console.log("Server is running ...."));
