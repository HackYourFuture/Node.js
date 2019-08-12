'use strict';

const fs = require('fs');
function sendStyle(response) {
  response.setHeader('Content-Type', 'text/css');
  const data = fs.readFileSync('./style.css', 'utf8');
  response.write(data);
}

module.exports = sendStyle;
