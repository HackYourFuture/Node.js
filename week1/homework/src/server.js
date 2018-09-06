'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */

const responseError = { "error": "Not found"};
const urls = ['/state', '/add', '/subtract', '/reset'];

function createServer(port) {
  let responseObject = {'state': 10};
  const server = http.createServer((request, response) => {
    const status = urls.includes(request.url)? 200 : 404;
    response.writeHead(status, {"Content-type": "application/json"})

    switch(request.url)
  	{        
      case '/state':
        response.write(JSON.stringify(responseObject, null, 2));
        break;
      case '/add':
        responseObject.state = responseObject.state + 1;
        response.write(JSON.stringify(responseObject, null, 2));
        break;
      case '/subtract':
        responseObject.state = responseObject.state - 1;
        response.write(JSON.stringify(responseObject, null, 2));
        break;
      case '/reset':
        responseObject.state = 10;
        response.write(JSON.stringify(responseObject, null, 2));
        break;
      default:
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
