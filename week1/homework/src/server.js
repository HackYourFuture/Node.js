'use strict';

const http = require('http');

function createServer() {
  let state = 10;
  const results = { 'Content-Type': 'application/json' };

  const server = http.createServer((request, response) => {
    let url = request.url;
    if (url === '/state') {
      response.writeHead(200, results);
      response.write(JSON.stringify({ state: state }));
    }
 else if (url === '/add') {
      state = state + 1;
      response.writeHead(200, results);
      response.write(JSON.stringify({ state: state }));
    }
 else if (url === '/subtract') {
      state = state - 1;
      response.writeHead(200, results);
      response.write(JSON.stringify({ state: state }));
    }
 else if (url === '/reset') {
      state = 10;
      response.writeHead(200, results);
      response.write(JSON.stringify({ state: state }));
    }
 else {
      response.writeHead(404, results);
      response.write(JSON.stringify({ error: 'Not found' }));
    }

    response.end();
  });
  return server;
}

module.exports = {
  createServer
};
