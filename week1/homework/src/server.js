'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
let responseObject = {'state': 10};
const responseError = { "error": "Not found"};
const urls = ['/state', '/add', '/subtract', '/reset'];
function createServer(port) {
  let responseObject = {'state': 10};
  const server = http.createServer((request, response) => {
    const status = (urls.some(elm => elm === request.url))? 200 : 404;
    response.writeHead(status, {"Content-type": "application/json"})
    switch(request.url)
  	{        
      case '/add':
      {
        responseObject.state = responseObject.state + 1;
        break;
      }
      case '/subtract':
      {
        responseObject.state = responseObject.state - 1;
        break;
      }
      case '/reset':
      {
        responseObject.state = 10;
        break;
      }
      default:
        break;
    }
    
    if(urls.some(elm => elm === request.url))
      response.write(JSON.stringify(responseObject, null, 2));
    else
      response.write(JSON.stringify(responseError, null, 2));

    
    response.end();
  	
  });

  return server;
}

module.exports = {
  createServer
};
