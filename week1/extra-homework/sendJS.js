'use strict';

const fs = require('fs');
function sendJS(res) {
  res.writeHead(200, { 'Content-Type': 'text/javascript' });
  fs.createReadStream('./browser.js').pipe(res);
}

module.exports = sendJS;
