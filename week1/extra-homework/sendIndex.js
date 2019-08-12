'use strict';

const fs = require('fs');
function sendIndex(response) {
  response.setHeader('Content-Type', 'text/html');
  const data = fs.readFileSync('./index.html', 'utf8');
  response.write(data);
}

module.exports = sendIndex;
