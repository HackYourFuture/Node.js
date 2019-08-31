'use strict';

{
  const http = require('http');

  const postData = (status, response, data) => {
    response.writeHead(status, {
      'Content-Type': 'application/json'
    });
    response.end(JSON.stringify(data));
  };

  function createServer(port) {
    let state = 10;

    const server = http.createServer((request, response) => {
      switch (request.url) {
        case '/state':
          postData(200, response, {
            state: state
          });
          break;
        case '/add':
          postData(200, response, {
            state: ++state
          });
          break;
        case '/subtract':
          postData(200, response, {
            state: --state
          });
          break;
        case '/reset':
          postData(200, response, {
            state: (state = 10)
          });
          break;
        default:
          postData(404, response, {
            error: 'Not found'
          });
          break;
      }
    });

    return server;
  }

  module.exports = {
    createServer
  };
}
