'use strict';

// TODO: Write the homework code in this file
const { appendFile, readFile, writeFile } = require('fs');
const { promisify } = require('util');
const readFileWithPromise = promisify(readFile);
const writeFileWithPromise = promisify(writeFile);
const args = process.argv.slice(2);
const cmd = args[0];
const TODO_PATH = 'todo.json';

function readTodos() {
  return readFileWithPromise(TODO_PATH, 'utf8')
    .then(JSON.parse)
    .catch(() => ([]));
}

function writeTodos(todos) {
  return writeFileWithPromise(TODO_PATH, JSON.stringify(todos));
}

switch (cmd) {
  case 'add':
    const text = args[1];
    readTodos().then(todos => {
      todos.push({
        text,
        done: false
      });
      return todos;
    }).then(writeTodos);
    break;
  case 'remove':
    break;
  case 'reset':
    console.log('reset');
    break;
  case 'help':
    break;
  case 'list':
    break;
  default:
    console.log('something');
}
