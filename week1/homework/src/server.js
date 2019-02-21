'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = 10;

  const server = http.createServer((request, response) => {
    function creatResponse(data, state) {
      response.writeHead(data, {
        'Content-Type': 'application/json',
      });

      response.write(JSON.stringify(state));
      response.end();
    }

    switch (request.url) {
      case '/state':
        creatResponse(200, { state });
        break;
      case '/add':
        state++;
        creatResponse(200, { state });
        break;
      case '/subtract':
        state--;
        creatResponse(200, { state });
        break;
      case '/reset':
        state = 10;
        creatResponse(200, { state });
        break;
      default:
        creatResponse(404, { error: 'Not found' });
    }
  });

  return server;
}

module.exports = {
  createServer,
};
