'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = 10;
  let body;
  let statusCode = 200;
  let message = 'OK';

  const server = http.createServer((request, response) => {
    // TODO: Write your homework code here
    switch (request.url) {
      case '/state':
        body = JSON.stringify({state}, null, 2);
        console.log('route /state', state);
        break;
      case '/add':
        state++;
        body = JSON.stringify({state}, null, 2);
        console.log('route /add', state);
        break;
      case '/subtract':
        state--;
        body = JSON.stringify({state}, null, 2);
        console.log('route /subtract', state);
        break;
      case '/reset':
        state = 10;
        body = JSON.stringify({state}, null, 2);
        console.log('route /reset', state);
        break;
      default:
        statusCode = 404;
        message = 'Not found';
        body = JSON.stringify({error: 'Not found'}, null, 2);
    }
    response.setHeader('Content-Type', 'application/json');
    response.statusMessage = message;
    response.statusCode = statusCode;
    response.write(body);
    response.end();
  });

  return server;
}

module.exports = {
  createServer
};
