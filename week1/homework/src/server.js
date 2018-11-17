'use strict';

const url = require('url');
const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = 10;
  let newState = state;

  const server = http.createServer((request, response) => {
    // TODO: Write your homework code here
    const requestedUrl = url.parse(request.url, true);
    switch (requestedUrl.pathname) {
      case '/state':
        writeRespond(200, { state: newState }, response);
        break;
      case '/add':
        newState++;
        writeRespond(200, { state: newState }, response);
        break;
      case '/subtract':
        newState--;
        writeRespond(200, { state: newState }, response);
        break;
      case '/reset':
        newState = state;
        writeRespond(200, { state: newState }, response);
        break;
      default:
        writeRespond(404, { error: 'Not found' }, response);
    }
  });
  return server;
}

function writeRespond(statuCode, stateMsg, response) {
  response.writeHead(statuCode, { 'Content-type': 'application/json' });
  response.end(JSON.stringify(stateMsg));
}
module.exports = {
  createServer
};
