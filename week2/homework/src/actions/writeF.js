'use strict';

const fs = require('fs');

function writeF(string) {
  fs.writeFileSync('./data.txt', string);
}

module.exports = writeF;
