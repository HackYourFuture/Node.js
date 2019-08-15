'use strict';

const fs = require('fs');
function sendStyle(res) {
  res.writeHead(200, { 'Content-Type': 'text/css' });
  fs.createReadStream('./style.css').pipe(res);
}

module.exports = sendStyle;
