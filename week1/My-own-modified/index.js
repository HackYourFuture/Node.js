"use strict";
const http = require("http");
// console.log(http.STATUS_CODES)
const server = http.createServer((req, res) => {
  console.log("Creating Server");
});
let state = 10;
const ORIGINAL = 10;
function responseWrite(val, response) {
  response.setHeader("content-type", "text/html");
  response.write(`<h1>${val}</h1>`);
  response.end()
}
server.on("request", (req, res) => {
  console.log(req.method, req.url);
  switch (req.url) {
    case "/state":
      responseWrite(state, res)
      break;
    case "/add":
      responseWrite(state += 1, res);
      break;
    case "/remove":
      responseWrite(state -= 1, res);
      break;
    case "/reset":
      state = ORIGINAL  
      responseWrite(state, res);
    break;
    default:
      res.statusCode = 404
      responseWrite(res.statusCode, res);
  }
});
server.on("connection", () => {
  console.log("connected")
});
const PORT = 4000;
server.listen(PORT, () => {
  console.log("lestening to", PORT)
})
