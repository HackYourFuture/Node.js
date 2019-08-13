'use strict';

const http = require('http');
const fs = require('fs');

function createServer(port) {
  const server = http.createServer((request, response) => {
    if (request.url === '/home' || request.url === '/') {
      response.writeHead(200, { 'Content-Type': 'text/html' });
      const indexHTML = fs.createReadStream(__dirname + '/index.html', 'utf8');
      indexHTML.pipe(response);
    } else if (request.url === '/image.gif') {
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.write('<script type="text/javascript" src="browser.js"></script>');
      response.end();
    } else if (request.url === '/browser.js') {
      response.writeHead(200, { 'Content-Type': 'application/javascript' });
      const script = fs.readFileSync(__dirname + '/browser.js', 'utf8');
      response.write(script);
      response.end();
    } else {
      response.writeHead(404, { 'Content-Type': 'text/plain' });
      response.end('Wrong address! Please go http://localhost:3000/image.gif');
    }
  });
  return server;
}

module.exports = {
  createServer,
};
