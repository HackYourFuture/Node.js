'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function  getResult(status, response, result){
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify(result));
}

function createServer(port) {
  let state = 10;
  const server = http.createServer((request, response) => {
  // TODO: Write your homework code here
  switch(request.url){
    case'/state':
    getResult(200, response, { state: state });
    break;
    case'/add':
    getResult(200, response, { state: ++state});
    break;
    case'/subtract':
    getResult(200, response, { state: --state });
    break;
    case'/reset':
    state = 10;
    getResult(200, response, { state: state});
    break;
    default:
    getResult(404, response, { error: 'Not found'});
  }
 });
  return server;
}

module.exports = {
  createServer
};
