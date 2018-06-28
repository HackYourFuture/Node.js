'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = 10;
  const server = http.createServer((request, response) => {
    // TODO: Write your homework code here
    let selectTransaction = (value) => {
      state = value;
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.write(JSON.stringify({ 'state': state }));
    };
    switch (request.url) {
      case ('/state'):
        selectTransaction(state);
        break;
      case ('/add'):
        state++;
        selectTransaction(state);
        break;
      case ('/subtract'):
        state--;
        selectTransaction(state);
        break;
      case ('/reset'):
        state = 10;
        selectTransaction(state);
        break;
      default:
        response.writeHead(404, { 'Content-Type': 'application/json' });
        response.write(JSON.stringify({ error: 'Not found' }));
    }
    response.end();
  });

  return server;
}

module.exports = {
  createServer
};
