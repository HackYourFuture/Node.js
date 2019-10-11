'use strict';

const http = require('http');

function createServer(port) {
  let state = 10;
  
  const setResponse = (responseStatus, response, responseObj) => {
    response.writeHead(responseStatus, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(responseObj));
  };

  const server = http.createServer((request, response) => {
    switch (request.url) {
      case '/state': 
        setResponse(200, response, { state: state });
        break;
      case '/add': 
        setResponse(200, response, { state: ++state });
        break;
      case '/subtract': 
        setResponse(200, response, { state: --state });
        break;
      case '/reset': 
        setResponse(200, response, { state: (state = 10) });
        break;
      default: 
        setResponse(404, response, { error: 'Not found' });
    }
  });
  return server;
}

module.exports = {
  createServer
};