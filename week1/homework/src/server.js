'use strict';

{
  const http = require('http');

  /* `createServer` MUST return an instance of `http.Server` otherwise the tests
   * will fail.
   */
  function createServer(port) {
    let state = 10;
    const stateObj = {};

    const server = http.createServer((request, response) => {
      if (request.url === '/state') {
        stateObj.state = state;
        response.setHeader('content-type', 'application/json');
        response.write(`${JSON.stringify(stateObj, null, ' ')}`);
      } else if (request.url === '/add') {
        state += 1;
        stateObj.state = state;
        response.setHeader('Content-Type', 'application/json');
        response.write(`${JSON.stringify(stateObj, null, ' ')}`);
      } else if (request.url === `/subtract`) {
        state -= 1;
        stateObj.state = state;
        response.setHeader('Content-Type', 'application/json');
        response.write(`${JSON.stringify(stateObj, null, ' ')}`);
      } else if (request.url === `/reset`) {
        state = 10;
        stateObj.state = state;
        response.setHeader('Content-Type', 'application/json');
        response.write(`${JSON.stringify(stateObj, null, ' ')}`);
      } else {
        const errorObj = {};
        errorObj.error = 'Not found';
        response.statusCode = 404;
        response.setHeader('Content-Type', 'application/json');
        response.write(`${JSON.stringify(errorObj, null, ' ')}`);
      }

      // I prefer if-else statement, but I also wanted to try switch statement as a future reference.
      /* 
      switch (request.url) {
        case '/state':
          stateObj.state = state;
          response.setHeader('Content-Type', 'application/json');
          response.write(`${JSON.stringify(stateObj, null, ' ')}`);
          break;
        case '/add':
          state += 1;
          stateObj.state = state;
          response.setHeader('Content-Type', 'application/json');
          response.write(`${JSON.stringify(stateObj, null, ' ')}`);
          break;
        case '/subtract':
          state -= 1;
          stateObj.state = state;
          response.setHeader('Content-Type', 'application/json');
          response.write(`${JSON.stringify(stateObj, null, ' ')}`);
          break;
        case '/reset':
          state = 10;
          stateObj.state = state;
          response.setHeader('Content-Type', 'application/json');
          response.write(`${JSON.stringify(stateObj, null, ' ')}`);
          break;
        default:
          const errorObj = {};
          errorObj.error = 'Not found';
          response.statusCode = 404;
          response.setHeader('Content-Type', 'application/json');
          response.write(`${JSON.stringify(errorObj, null, ' ')}`);
      } */

      response.end();
    });

    return server;
  }

  module.exports = {
    createServer,
  };
}
