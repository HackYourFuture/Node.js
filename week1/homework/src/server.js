'use strict';

const http = require('http');

function createServer(port) {
  let state = 10;
  const server = http.createServer((request, response) => {
    function main(response, state) {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.write(JSON.stringify({ 'state': state }));
      response.end();
    }
    switch (request.url) {
      case '/state':
        main(response, state);
        break;

      case '/add':
        main(response, ++state);
        break;

      case '/subtract':
        main(response, --state);
        break;

      case '/reset':
        main(response, state = 10);
        break;

      default:
        response.writeHead(404, { 'Content-Type': 'application/json' });
        const notFound = { 'error': 'Not found' };
        response.end(JSON.stringify(notFound, null, 2));
    }
  });
  return server;
}
module.exports = {
  createServer
};
