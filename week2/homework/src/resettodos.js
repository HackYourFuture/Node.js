'use strict';

const { unlink } = require('fs');
const { promisify } = require('util');
const removeFileWithPromise = promisify(unlink);
const TODO_PATH = 'todo.json';

function resetToDos() {
  return removeFileWithPromise(TODO_PATH);
}

module.exports = {
  resetToDos
};
