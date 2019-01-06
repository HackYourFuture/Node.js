'use strict';

const http = require('http');
const calculation = require('./calculations');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  // let state = 10;

  const server = http.createServer((request, response) => {
    if (request.url === '/') {
      calculation.calculator('/', 404, response);
    } else if (request.url === '/state') {
      calculation.calculator('/state', 200, response);
    } else if (request.url === '/add') {
      calculation.calculator('/add', 200, response);
    } else if (request.url === '/subtract') {
      calculation.calculator('/subtract', 200, response);
    } else if (request.url === '/reset') {
      calculation.calculator('/reset', 200, response);
    } else {
      calculation.calculator('', 404, response);
    }
  });

  return server;
}

module.exports = {
  createServer,
};
