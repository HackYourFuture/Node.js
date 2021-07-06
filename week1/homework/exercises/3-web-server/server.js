/**
 * Exercise 3: Create an HTTP web server
 */

const http = require("http");
const path = require("path");
const fs = require("fs");
//create a server
let server = http.createServer(function (req, res) {
  // YOUR CODE GOES IN HERE

  if (req.url === "/") {
    fs.readFile(path.join(__dirname, "index.html"), (error, content) => {
      if (error) throw error;
      res.writeHead(200, { "content-Type": "text/html" });
      res.write(content);
      res.end();
    });
  }
  if (req.url === "/index.js") {
    fs.readFile(path.join(__dirname, "index.js"), (error, content) => {
      if (error) throw error;
      res.writeHead(200, { "content-Type": "text/javascript" });
      res.write(content);
      res.end();
    });
  }
  if (req.url === "/style.css") {
    fs.readFile(path.join(__dirname, "style.css"), (error, content) => {
      if (error) throw error;
      res.writeHead(200, { "content-Type": "text/css" });
      res.write(content);
      res.end();
    });
  }
});

server.listen(3000); // The server starts to listen on port 3000
