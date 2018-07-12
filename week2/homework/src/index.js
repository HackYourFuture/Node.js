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
  case 'list':
    console.log('list');
    break;
  case 'help':
  default:
    const commands = `Commands: 
      add: Adds a to-do item. All the words behind add are entered as 1 to-do item to the list.
      remove: Removes a to-do item by its 1-base index, e.g. to remove second item.
      reset: Removes all to-do items from the list.
      list: Shows current to-dos, or shows an appropriate text if there are no to-dos.
      help: Shows help section.`;
    console.info(commands);
    break;
}
