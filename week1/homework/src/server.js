'use strict';

const http = require('http');

function createServer(port) {
  let state = 10;

  const server = http.createServer((request, response) => {
    // TODO: Write your homework code here
  });

  return new Promise(resolve => server.listen(port, () => resolve(server)));
}

module.exports = {
  createServer
};
