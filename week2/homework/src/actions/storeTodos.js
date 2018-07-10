'use strict';

const { promisify } = require('util');
const { writeFile } = require('fs');

const writeFilePromisified = promisify(writeFile);
const TODOS_PATH = 'todo.json';

function storeTodos(todos) {
  return writeFilePromisified(TODOS_PATH, JSON.stringify(todos, null, 2));
}

module.exports = storeTodos;
