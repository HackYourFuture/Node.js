'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */

const responseError = { "error": "Not found"};

function createServer(port) {
  let responseObject = {'state': 10};
  const server = http.createServer((request, response) => {

    switch(request.url)
  	{        
      case '/state':
        response.writeHead(200, {"Content-type": "application/json"});
        response.write(JSON.stringify(responseObject, null, 2));
        break;
      case '/add':
        responseObject.state = responseObject.state + 1;
        response.writeHead(200, {"Content-type": "application/json"});
        response.write(JSON.stringify(responseObject, null, 2));
        break;
      case '/subtract':
        responseObject.state = responseObject.state - 1;
        response.writeHead(200, {"Content-type": "application/json"});
        response.write(JSON.stringify(responseObject, null, 2));
        break;
      case '/reset':
        responseObject.state = 10;
        response.writeHead(200, {"Content-type": "application/json"});
        response.write(JSON.stringify(responseObject, null, 2));
        break;
      default:
      response.writeHead(404, {"Content-type": "application/json"});
        response.write(JSON.stringify(responseError, null, 2));
        break;
    }
    response.end();
  });

  return server;
}

module.exports = {
  createServer
};
