"use strict";

const http = require("http");

const sendState = require("./responses/sendState");
const sendError = require("./responses/sendError");

const createServer = port => {
  let state = 10;

  return http.createServer(({ url }, response) => {
    switch (url) {
      case "/":
        response.writeHead(302, { Location: "/state" });
        break;
      case "/state":
        sendState(response, state);
        break;
      case "/add":
        sendState(response, ++state);
        break;
      case "/subtract":
        sendState(response, --state);
        break;
      case "/reset":
        sendState(response, (state = 10));
        break;
      default:
        (response.statusCode = 404), sendError(response, "Not found");
    }
    response.end();
  });
};
module.exports = {
  createServer
};
