const http = require("http");
const fs = require("fs");
const path = require("path");

const port = process.env.port || 3000;

const server = http.createServer(function(req, res) {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    fs.createReadStream(path.join(__dirname, "index.html")).pipe(res);
  } else if (req.url === "/script.js") {
    res.writeHead(200, { "Content-Type": "text/javascript" });
    fs.createReadStream(path.join(__dirname, "script.js")).pipe(res);
  } else if (req.url === "/style.css") {
    res.writeHead(200, { "Content-Type": "text/css" });
    fs.createReadStream(path.join(__dirname, "style.css")).pipe(res);
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    fs.createReadStream(path.join(__dirname, "error.html")).pipe(res);
  }
});

server.listen(port, () => {
  console.log(`The port started at ${port}`);
});