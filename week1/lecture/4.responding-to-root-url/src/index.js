"use strict";

// version 3

const http = require("http");

http
  .createServer(function(req, res) {
    console.log(req.url);

    if (req.url === "" || req.url === "/") {
      res.write("You have reached the root!");
      res.end();
    }
  })
  .listen(8080);
