'use strict';

const { unlink } = require('fs');
const { promisify } = require('util');
const helpMessages = require('./helpMessages');

const unlinkPromisified = promisify(unlink);
const TODOS_PATH = 'todo.json';

function resetTodos() {
  return unlinkPromisified(TODOS_PATH).catch(() => {
    console.log('no todos to reset, you might want to **add** one first');
    console.log(helpMessages.add);
  });
}

module.exports = resetTodos;
