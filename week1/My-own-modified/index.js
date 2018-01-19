"use strict";
const http = require("http");
const server = http.createServer((req, res) => {
  console.log("Creating Server");
});
let state = 10;
let original = 10;
server.on("request", (req, res) => {
  function responseWrite(val) {
    res.setHeader("content-type", "text/html");
    res.write(`<h1>${val}</h1>`);
  }
  console.log(req.method, req.url);
  switch (req.url) {
    case "/state":
      responseWrite(state)
      break;
    case "/add":
      responseWrite(state += 1);
      break;
    case "/remove":
      responseWrite(state -= 1);
      break;
    case "/reset":
      responseWrite(original);
    break;
    default:
      res.statusCode = 404
      responseWrite(res.statusCode);
  }
  res.end()  
});
server.on("connection", () => {
  console.log("connected")
});
const PORT = 4000;
server.listen(PORT, () => {
  console.log("lestening to", PORT)
})
