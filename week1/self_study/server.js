const http = require("http");
const fs = require("fs");
const HOSTNAME= process.env.HOSTNAME || "localhost";
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end('hello world')

});

server.listen(PORT,HOSTNAME, () => console.log(`server running at http://${HOSTNAME}:${PORT}`));