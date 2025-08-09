const http = require("http");
const { exit } = require("process");

// this creates an nodeJS server and make an instance of it inside the 'server' variabel
const server = http.createServer(function (req, res) {
  // here req, res both r OBJECTS
  // & .end() is a method of 'res' obj, which should be called when we want something to be seen in web page in our server !

  // Handling extra Path requests / also known as "ROUTES"
  if (req.url === "/loginPage") {
    res.end("There is no login page LoL");
  }

  res.end("Hello world!");
});

// now using our 'server' instance to listen to our server
const port = 6500;
server.listen(port);

// Now after doing node server.js, our server will start , Cheer🥂 our server is Ready !

// But this is a complicated way is we're creating a big project using node, we for web-server creation we've to use 'express-JS' which is an nodeJS web-application Framework, built on top of nodeJS
