'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = 10;

  const server = http.createServer((request, response) => {
    // TODO: Write your homework code here
    function displayContent(status, content) {
      response.writeHead(status, { 'Content-Type': 'application/json' });
      response.write(JSON.stringify(content));
      response.end();
    }
    switch (request.url) {
      case '/state' :
        displayContent(200, {'state':state});
        break;
      case '/add' :
        state++;
        displayContent(200, {'state':state});
        break;
      case '/subtract':
        state--;
        displayContent(200, {'state':state});
        break;
      case '/reset' :
        state = 10;
        displayContent(200, {'state':state});
        break;
      default:
        displayContent(404, {'error':'Not found'});
    }
  });

  return server;
}

module.exports = {
  createServer
};
