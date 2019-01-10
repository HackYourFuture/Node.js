'use strict';

const http = require('http');
const calculation = require('./calculations');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  const server = http.createServer((request, response) => {
    calculation.calculator(request.url, response);
  });

  return server;
}

module.exports = {
  createServer,
};
