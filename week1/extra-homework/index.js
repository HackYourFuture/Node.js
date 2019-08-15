'use strict';

const http = require('http');
const sendIndex = require('./sendIndex');
const sendJS = require('./sendJS');
const sendImage = require('./sendImage');
const sendStyle = require('./sendStyle');

const PORT = 3000;

function handleRequest(req, res) {
  console.log(`${req.method} ${req.url} HTTP/${req.httpVersion}`);
  switch (req.url) {
    case '/style.css':
      sendStyle(res);
      break;
    case '/browser.js':
      sendJS(res);
      break;
    case '/image.gif':
      sendImage(res);
      break;
    default:
      sendIndex(res);
      break;
  }
}

const server = http.createServer(handleRequest);

server.listen(PORT, () => {
  console.log('Server is up on http://localhost:3000/');
});
