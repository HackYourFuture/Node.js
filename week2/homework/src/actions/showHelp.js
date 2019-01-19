'use strict';

const readF = require('./readF');

function showHelp() {
  console.log(readF('./help.txt'));
}

module.exports = showHelp;
