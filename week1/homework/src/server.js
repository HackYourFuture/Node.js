'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer() {
  const num = { state: 10 };

  const server = http.createServer((request, response) => {
    switch (request.url) {
      case "/":
      case "/state":
        responser(response, num);
        break;
      case "/add":
        num.state++;
        responser(response, num);
        break;
      case "/subtract":
        num.state--;
        responser(response, num);
        break;
      case "/reset":
        num.state = 10;
        responser(response, num);
        break;
      default:
        response.writeHead(404, { 'Content-Type': 'application/json' });
        response.write(JSON.stringify({ "error": "Not found" }));
        response.end();
    }
  });

  return server;
}

function responser(res, num) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(num, null, 2));
}

module.exports = {
  createServer
};
