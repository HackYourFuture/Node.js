'use strict';

const fs = require('fs');
function sendImage(response) {
  response.setHeader('Content-Type', 'image/gif');
  const data = fs.readFileSync('./image.gif');
  response.write(data);
}

module.exports = sendImage;
