'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = 10;

  const server = http.createServer((request, response) => {
    // TODO: Write your homework code here
    const giveResult = (statusCode, object) => {
      response.writeHead(statusCode, { 'Content-Type': 'application/json' });
      response.write(JSON.stringify(object));
    };

    switch (request.url) {
      default: giveResult(404, { error: `Not found` });
        break;
      case `/state`:
        giveResult(200, { state });
        break;
      case `/add`:
        state++;
        giveResult(200, { state });
        break;
      case `/subtract`:
        state--;
        giveResult(200, { state });
        break;
      case `/reset`:
        state = 10;
        giveResult(200, { state });
        break;
    }

    // Finish writing my code.
    response.end();
  });

  return server;
}

module.exports = {
  createServer
};
