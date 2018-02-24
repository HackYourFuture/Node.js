'use strict';

const http = require('http');
const path = require('path');

const sendIndexPage = require('./responses/sendIndexPage');
const sendOtherPage = require('./responses/sendOtherPage');
const sendStyles    = require('./responses/sendStyles');
const sendText      = require('./responses/sendText');

const PORT = 3000;

function handleRequest(request, response) {
  console.log(request.method, request.url);

  switch (request.url) {
    case '/':
      sendIndexPage(response);
      break;
    case '/other':
      sendOtherPage(response);
      break;
    case '/styles.css':
      sendStyles(response);
      break;
    default:
      const extension = path.extname(request.url);
      if (extension === '') {
        response.statusCode = 302;
        response.setHeader('Location', '/');
      }
      else {
        response.statusCode = 404;
        sendText(response, 'File not found');
      }
  }

  response.end();
}

const server = http.createServer(handleRequest);

server.listen(PORT, () => {
  console.log(`Server started http://localhost:${PORT}`);
});
