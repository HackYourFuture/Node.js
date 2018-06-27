'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  const startState = 10;
  const stateObj = {
    state: startState
  };

  function showState(response, obj) {
    const code = (obj.hasOwnProperty('error')) ? 404 : 200;
    response.writeHead(code, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(obj, null, 4));
  }

  const server = http.createServer((request, response) => {
    switch (request.url) {
      case '/state':
        showState(response, stateObj);
        break;
      case '/add':
        stateObj.state++;
        showState(response, stateObj);
        break;
      case '/subtract':
        stateObj.state--;
        showState(response, stateObj);
        break;
      case '/reset':
        stateObj.state = startState;
        showState(response, stateObj);
        break;
      default:
        showState(response, { error: 'Not found' });
    }
  });

  return server;
}

module.exports = {
  createServer
};
