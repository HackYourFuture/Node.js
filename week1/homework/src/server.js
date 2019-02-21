'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = 10;

  const server = http.createServer((request, response) => {
    let responseBody, error = '';
    response.setHeader('Content-Type','application/json') 
    
    switch (request.url){
      case '/':
      case '/state':
      break;
      case '/add': state++ 
      break;
      case '/subtract': state--
      break;
      case '/reset': state = 10;
      break;
      default: error = "Not found";
    }
    
    if (error) {
      responseBody = {error}
      response.statusCode = 404;
    } else {
      responseBody = {state}
      response.statusCode = 200;
    }
    response.end(JSON.stringify(responseBody));
  });

  return server;
}

module.exports = {
  createServer
};
