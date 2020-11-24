/**
 * Exercise 3: Create an HTTP web server
 */

var http = require("http");
const path = require("path");
const fs = require("fs");
//create a server
let server = http.createServer(function (req, res) {
  // YOUR CODE GOES IN HERE
  if (req.url === "/") {
    serveFile("index.html", "text/html", res);
  } else if (req.url === "/index.js") {
    serveFile(req.url, "application/javascript", res);
  } else if (req.url === "/style.css") {
    serveFile(req.url, "text/css", res);
  }
});

server.listen(3000); // The server starts to listen on port 3000

function serveFile(file, contentType, res) {
  let content;
  try {
    content = fs.readFileSync(path.join(__dirname, file));
  } catch (err) {
    console.log(err);
  }
  res.writeHead(200, { "Content-Type": contentType });
  res.end(content);
}
// fs, path, http: a build in modules in node.js code
