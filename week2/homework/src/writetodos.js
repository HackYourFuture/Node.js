'use strict';

const {writeFile} = require('fs');
const { promisify } = require('util');
const writeFileWithPromise = promisify(writeFile);
const TODO_PATH = 'todo.json';

function writeToDos(toDos) {
  return writeFileWithPromise(TODO_PATH, JSON.stringify(toDos, null, 2));
}

module.exports = {
  writeToDos
};
