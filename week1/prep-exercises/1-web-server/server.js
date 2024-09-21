const http = require("http");
const fs = require("fs");

let server = http.createServer(function (req, res) {
  if (req.url === "/") {
    readData("index.html", "text/html", res);
  } else if (req.url === "/index.js") {
    readData("index.js", "application/javascript", res);
  } else if (req.url === "/style.css") {
    readData("style.css", "text/css", res);
  }
});

const readData = (file, type, res) => {
  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end(err.message);
    }

    res.writeHead(200, { "Content-Type": type });
    res.end(data);
  });
};

server.listen(3000);
