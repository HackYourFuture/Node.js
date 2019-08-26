"use strict";

// version 2

const http = require("http");

http
  .createServer(function(req, res) {
    console.log(req.url);

    res.write("Hello Class 5!");
    res.end();
  })
  .listen(8080);
