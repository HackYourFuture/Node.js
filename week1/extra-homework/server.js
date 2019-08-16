'use strict';

const http = require('http');
const sendIndex = require('./sendIndex');
const sendJS = require('./sendJS');
const sendImage = require('./sendImage');
const sendStyle = require('./sendStyle');

function createServer(port) {
  function handleResponse(req, res) {
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

  return http.createServer(handleResponse);
}

module.exports = { createServer };
