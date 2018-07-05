'use strict';

const { readFile, writeFile } = require('fs');
const { promisify } = require('util');

const readWithPromise = promisify(readFile);
const writeWithPromise = promisify(writeFile);

function readTODOs(path) {
  return readWithPromise(path, 'utf8')
    .then(JSON.parse)
    .catch(() => ([]));
}

function writeTODOs(path, toDos) {
  return writeWithPromise(path, JSON.stringify(toDos, null, 2))
    .catch(() => 'File writing error');
}

module.exports = {
  readTODOs,
  writeTODOs
};
