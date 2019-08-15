'use strict';

const fs = require('fs');
function sendImage(res) {
  res.writeHead(200, { 'Content-Type': 'image/gif' });
  fs.createReadStream('./image.gif').pipe(res);
}

module.exports = sendImage;
