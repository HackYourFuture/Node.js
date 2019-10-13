'use strict';
const { readFile, writeFile } = require('fs');
const { promisify } = require('util');

const readFilePromised = promisify(readFile);
const writeFilePromised = promisify(writeFile);

module.exports = {
  readFile: readFilePromised,
  writeFile: writeFilePromised
};
