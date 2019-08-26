"use strict";

// version 4.1

const http = require("http");

http
  .createServer(function(req, res) {
    const url = req.url;

    console.log(url);

    if (url === "" || url === "/") {
      res.write("You have reached the root!");
      res.end();
    } else if (url === "/contacts") {
      res.write("HYF Brussels ");
      res.end();
    } else {
      res.writeHead(404);
      res.write(`You tried ${url}. Please try something else!`);
      res.end();
    }
  })
  .listen(8080);
