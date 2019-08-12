'use strict';

const fs = require('fs');
function sendJS(response) {
  response.setHeader('Content-Type', 'text/javascript');
  const data = fs.readFileSync('./browser.js', 'utf8');
  response.write(data);
}

module.exports = sendJS;
