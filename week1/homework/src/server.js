'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = 10;

  const server = http.createServer((request, response) => {
    // TODO: Write your homework code here
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    switch (request.url) {
      case '/state':
        res.end(state)
        break;
      case '/add':
        res.end(state++)
        break;
      case 'subtract':
        res.end(state--)
        break;
      default:
        if(request.url == '/'){
          res.end(state = 10)
        }else{
          res.end('error:not found')
        }
  };

  response.statusCode = 404;
    response.end('Not Found');

  server.listen(port, '127.0.0.1');
  return server;
}

module.exports = {
  createServer,
};
