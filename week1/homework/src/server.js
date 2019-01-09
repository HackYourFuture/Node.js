'use strict';

const http = require('http');


function createServer(port) {
  let state = 10;

  const server = http.createServer((request, response) => {

    function stateFunction(response, state) {

      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.write(JSON.stringify({ state }));;
      response.end();
    }


    if (request.url === "/state") {
      stateFunction(response, state);

    } else if (request.url === '/add') {
      state += 1;
      stateFunction(response, state);
    } else if (request.url === '/subtract') {
      state -= 1;
      stateFunction(response, state);
    }
    else if (request.url === "/reset") {

      state = 10;
      stateFunction(response, state);

    } else {
      response.writeHead(404, { 'Content-Type': 'application/json' });

      response.end(JSON.stringify({ 'error': 'Not found' }));
    }



  });

  return server;
}

module.exports = {
  createServer
};
