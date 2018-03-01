"use strict";

const http = require("http");
let state = 10;

function handleRequest(request, response) {
  switch (request.url) {
    case "/":
      response.setHeader("content-type", "text/html");
      response.write(`<h2>OK</h2> ${state}`);
      break;
    case "/add":
      state++;
      response.setHeader("content-type", "text/html");
      response.write(`<h2>OK</h2> ${state}`);
      break;
    case "/subtract":
      state--;
      response.setHeader("content-type", "text/html");
      response.write(`<h2>OK</h2> ${state}`);
      break;
    case "/reset":
      state = '';
      response.setHeader("content-type", "text/html");
      response.write(`<h2>OK</h2> ${state}`);
      break;
    default:
      response.statusCode = 404;
      response.write(`Not Found.. current state is: ${state}`);
      break;
  }
  response.end();
}

const server = http.createServer(handleRequest);
server.listen(8080, () => {
  console.log("server working on http//localhost:8080");
});
