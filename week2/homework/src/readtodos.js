'use strict';

const {readFile} = require('fs');
const { promisify } = require('util');
const readFileWithPromise = promisify(readFile);
const TODO_PATH = 'todo.json';

function readToDos() {
  return readFileWithPromise(TODO_PATH, 'utf8')
    .then(JSON.parse)
    .catch(() => ([]));
}

module.exports = {
  readToDos
};
