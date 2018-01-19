"use strict";
const http = require("http");
const server = http.createServer((req, res) => {
  console.log("Creating Server");
});
let state = 10;
let original = 10;
server.on("request", (req, res) => {
  console.log(req.method, req.url);
  switch (req.url) {
    case "/state":
      res.setHeader("content-type", "text/html");
      res.write(`<h1>${state}</h1>`);
      res.end()
      break;
    case "/add":
      res.setHeader("content-type", "text/html");
      res.write(`<h1>${state += 1}</h1>`);
      res.end()
      break;
    case "/remove":
      res.setHeader("content-type", "text/html");
      res.write(`<h1>${state -= 1}</h1>`);
      res.end()
      break;
    case "/reset":
      res.setHeader("content-type", "text/html");
      res.write(`<h1>${original}</h1>`);
      res.end()
      break;
    default:
      res.statusCode = 404
      res.write(`<h1>${res.statusCode}</h1>`);
      res.end()  
  }
});
server.on("connection", () => {
  console.log("connected")
});
const PORT = 4000;
server.listen(PORT, () => {
  console.log("lestening to", PORT)
})