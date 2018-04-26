'use strict';

const http = require('http');
function createServer(port) {
  let state = 10;
  const server = http.createServer((request, response) => {
    response.setHeader('Content-Type', 'application/json');
    if (request.url === '/state') {
      const defaultValue = JSON.stringify({
        state: state
      });
      response.write(defaultValue);
    }
    else if (request.url === '/add') {
      const add = JSON.stringify({
        state: ++state
      });
      response.write(add);
    }
    else if (request.url === '/subtract') {
      const remove = JSON.stringify({
        state: --state
      });
      response.write(remove);
    }
    else if (request.url === '/reset') {
      state = 10;
      const reset = JSON.stringify({
        state: state
      });
      response.write(reset);
    }
    else {
      const error = JSON.stringify({
        error: 'Not found'
      });
      response.statusCode = 404;
      response.write(error);
    }
    response.end();
  });
  return server;
}
module.exports = {
  createServer
};
