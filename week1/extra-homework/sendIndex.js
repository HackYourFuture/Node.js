'use strict';

const fs = require('fs');
function sendIndex(res) {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  fs.createReadStream('./index.html').pipe(res);
}

module.exports = sendIndex;
