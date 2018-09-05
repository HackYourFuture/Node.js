'use strict';

const http = require('http');
/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = 10;
  const server = http.createServer((request, response) => {
    // TODO: Write your homework code here
    let jsonContent = JSON.stringify(state);
    let msgStatus = 0;
    switch (request.url) {
      case '/':
      case '/reset':
        state = 10;
        jsonContent = JSON.stringify({ 'state': state });
        msgStatus = 200;
        break;
      case '/state':
        jsonContent = JSON.stringify({ 'state': state });
        msgStatus = 200;
        break;
      case '/add':
        state++;
        jsonContent = JSON.stringify({ 'state': state });
        msgStatus = 200;
        break;
      case '/subtract':
        state--;
        jsonContent = JSON.stringify({ 'state': state });
        msgStatus = 200;
        break;
      default:
        jsonContent = JSON.stringify({ 'error': 'Not found' });
        msgStatus = 404;
        break;
    }
    response.writeHead(msgStatus, {'Content-Type': 'application/json'});
    response.write(jsonContent);
    response.end();
  });
  return server;
}

module.exports = {
  createServer
};
