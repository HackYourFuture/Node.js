"use strict";

// version 4

const http = require("http");

http
  .createServer(function(req, res) {
    console.log(req.url);

    if (req.url === "" || req.url === "/") {
      res.write("You have reached the root!");
      res.end();
    } else if (req.url === "/contacts") {
      res.write("HYF Brussels ");
      res.end();
    }
  })
  .listen(8080);
