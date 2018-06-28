"use strict";

const http = require("http");

function createServer(port) {
  let state = 10;
  function okResponse(response) {
    response.writeHead(200, { "Content-type": "application/json" });
    response.end(JSON.stringify({ state: state }));
  }
  const server = http.createServer((request, response) => {
    switch (request.url) {
      case "/state":
        okResponse(response);
        break;
      case "/add":
        state++;
        okResponse(response);
        response.end();
        break;
      case "/subtract":
        state--;
        okResponse(response);
        break;
      case "/reset":
        state = 10;
        okResponse(response);
        break;
      default:
        response.writeHead(404, { "Content-type": "application/json" });
        response.end(JSON.stringify({ error: "Not found" }));
        break;
    }
  });
  return server;
}

module.exports = {
  createServer
};
