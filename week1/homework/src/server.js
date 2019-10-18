'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = 10;

  const server = http.createServer((request, response) => {
    const myResponseObj = {};
    if (request.url === '/' || request.url === '/state') {
      myResponseObj.state = state; // { state: 10 }
    }
    else if (request.url === '/add') {
    // add
      state += 1;
      myResponseObj.state = state; // {state: 11}
    }
    else if (request.url === '/subtract') {
    // subtract
      state -= 1;
      myResponseObj.state = state;
    }
    else if (request.url === '/reset') {
    // reset
      state = 10;
      myResponseObj.state = state;
    }
    else {
      myResponseObj.error = 'Not found';
      response.statusCode = 404;
    }
    response.setHeader('Content-Type', 'application/json');
    response.write(JSON.stringify(myResponseObj));
    response.end();
  });

  return server;
}

module.exports = {
  createServer
};
