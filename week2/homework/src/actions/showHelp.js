'use strict';

const fs = require('fs');

function showHelp() {
  console.log(fs.readFileSync('./help.txt', 'utf8'));
}

module.exports = showHelp;
