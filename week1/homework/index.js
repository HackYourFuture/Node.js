'use strict';
let state = 10;
const http = require('http');
let server = http.createServer();

server.on('connection', () => {
  console.log('server is connected');
});

server.on('request', (request, response) => {
  console.log('requesting', request.url);
  function setResponse(header) {
    response.setHeader('Content-Type', 'Text-html');
    response.write(`<h1>${header}</h1>`);
    response.end();
  }
  switch (request.url) {
    case '/add':
      setResponse(state++);
      break;
    case '/remove':
      setResponse(state--);
      break;
    case '/reset':
      setResponse((state = 10));
      break;
    case '/state':
      setResponse(state);
      break;
    default:
      setResponse('Error 404, page not found');
  }
});
const port = 8080;
server.listen(port, () => {
  console.log('Listening on', port);
});
