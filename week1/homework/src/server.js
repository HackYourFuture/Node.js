'use strict';

const http = require('http');
const urlExtension = require('./urlExtension');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = 10;

  const server = http.createServer((request, response) => {
    state = urlExtension.myStateFunction(request, response, state);
    response.end();
  });

  return server;
}

module.exports = {
  createServer
};
