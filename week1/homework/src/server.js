'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` 
otherwise the tests will fail.
 */



function createServer() {
  let state = 10;

  const server = http.createServer((request, response) => {
    // TODO: Write your homework code here
    function writeContent(status, content) {
      response.writeHead(status, { 'Content-Type': 'application/json' });
      response.write(JSON.stringify(content));
      response.end();
    }

    switch (request.url) {
      case '/state':
        writeContent(200, { 'state': state });
        break;

      case '/add':
        state++;
        writeContent(200, { 'state': state });
        break;

      case '/subtract':
        state--;
        writeContent(200, { 'state': state });
        break;

      case '/reset':
        state = 10;
        writeContent(200, { 'state': state });
        break;

      default:
        writeContent(404, { 'error': 'Not found' });
    }
  });

  return server;
}

module.exports = {
  createServer
};
