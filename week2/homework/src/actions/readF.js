'use strict';

const fs = require('fs');

function readF(file) {
  return fs.readFileSync(file, 'utf8');
}

module.exports = readF;
