'use strict';

function sendStyles(response) {
  response.setHeader('Content-Type', 'text/css');
  response.write(`
    body {
      background: gray;
      color:      blue;
    }
  `);
}

module.exports = sendStyles;
