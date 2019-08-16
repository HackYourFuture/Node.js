'use strict';

const http = require('http');
const Util = require('./helper');
const State = require('./fileContent');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */

function createServer(port) {
  const state = new State(10);
  const server = http.createServer((request, response) => {
    if (request.url === '/state') {
      Util.sendFile(response, state);
    }
    if (request.url === '/add') {
      state.add();
      Util.sendFile(response, state);
    }
    if (request.url === '/subtract') {
      state.subtract();
      Util.sendFile(response, state);
    }
    if (request.url === '/reset') {
      state.reset();
      Util.sendFile(response, state);
    }
    Util.handleError(response);
  });

  return server;
}

module.exports = {
  createServer
};
