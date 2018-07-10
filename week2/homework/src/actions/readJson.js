'use strict';

const { readFile } = require('fs');
const { promisify } = require('util');

const readFilePromisified = promisify(readFile);
const TODOS_PATH = 'todo.json';

function readJSON() {
  return readFilePromisified(TODOS_PATH, 'utf8')
    .then(JSON.parse)
    .catch(() => []);
}

module.exports = readJSON;
