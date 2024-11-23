/**
 * Exercise 3: Create an HTTP web server
 */

const http = require("http");
const fs = require("fs");
const path = require("path");

let server = http.createServer(function (req, res) {
  if (req.url === "/") {
    fs.readFile(path.join(__dirname, "index.html"), "utf8", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.write("Internal Server Error");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
      }
      res.end();
    });
  } else if (req.url === "/index.js") {
    fs.readFile(path.join(__dirname, "index.js"), "utf8", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.write("Internal Server Error");
      } else {
        res.writeHead(200, { "Content-Type": "application/javascript" });
        res.write(data);
      }
      res.end();
    });
  } else if (req.url === "/style.css") {
    fs.readFile(path.join(__dirname, "style.css"), "utf8", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.write("Internal Server Error");
      } else {
        res.writeHead(200, { "Content-Type": "text/css" });
        res.write(data);
      }
      res.end();
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.write("Not Found");
    res.end();
  }
});

server.listen(3000);
