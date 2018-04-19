'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = 10;

  const server = http.createServer((request, response) => {
    // TODO: Write your homework code here
    const sendJsonData = (statusCode, jsonMessage) => {
      response.writeHead(statusCode, {
        'Content-Type': 'application/json'
      });
      response.end(JSON.stringify(jsonMessage));
    };

    switch (request.url) {
      case '/state':
        sendJsonData(200, { state: state });
        break;
      case '/add':
        state++;
        sendJsonData(200, { state: state });
        break;
      case '/subtract':
        state--;
        sendJsonData(200, { state: state });
        break;
      case '/reset':
        state = 10;
        sendJsonData(200, { state: state });
        break;
      default:
        sendJsonData(404, { error: 'Not found' });
        break;
    }
  });

  return server;
}

module.exports = {
  createServer
};
