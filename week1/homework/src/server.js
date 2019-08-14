'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = 10;

  const server = http.createServer((request, response) => {
    // TODO: Write your homework code here
    console.log(request.url);
    const giveResult = (statusCode, object) => {
      response.writeHead(statusCode, { 'Content-Type': 'application/json' });
      response.write(JSON.stringify(object));
    };
    if (request.url === `/state`) {
      giveResult(200, { state });
    }
 else if (request.url === `/add`) {
      state++;
      giveResult(200, { state });
    }
 else if (request.url === `/subtract`) {
      state--;
      giveResult(200, { state });
    }
 else if (request.url === `/reset`) {
      state = 10;
      giveResult(200, { state });
    }
 else {
      giveResult(404, { error: `Not found` });
    }

    // Finish writing my code.
    response.end();
  });

  return server;
}

module.exports = {
  createServer
};
