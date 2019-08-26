"use strict";

const http = require("http");

http
  .createServer(function(req, res) {
    res.write("Hello Class 5!");
    res.end();
  })
  .listen(8080);
