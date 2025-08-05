/**
 * Exercise 3: Create an HTTP web server
 */

const http = require("http");
const fs = require("fs");
const path = require("path");

// Create a server
const server = http.createServer((req, res) => {
  let filePath = "";
  let contentType = "";

  if (req.url === "/") {
    filePath = path.join(__dirname, "index.html");
    contentType = "text/html";
  } else if (req.url === "/index.js") {
    filePath = path.join(__dirname, "index.js");
    contentType = "application/javascript";
  } else if (req.url === "/style.css") {
    filePath = path.join(__dirname, "style.css");
    contentType = "text/css";
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
    return;
  }

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
      return;
    }
    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  });
});

// Start the server
server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
