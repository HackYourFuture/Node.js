'use strict';

// TODO: Write the homework code in this file

const { readFile, writeFile } = require('fs');
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
  return writeFileWithPromise(TODO_PATH, JSON.stringify(todos, null, 2));
}

async function main() {
  switch (cmd) {
    case 'add':
      const text = args[1];
      const todos = await readTodos();
      todos.push({
        text,
        done: false
      });
      await writeTodos(todos);
      const newTodos = await readTodos();
      console.log(newTodos);
      break;

    case 'remove':
      const remove = await readTodos();
      remove.splice(args[1] - 1, 1);
      await writeTodos(remove);
      console.log(remove);
      break;

    case 'reset':
      const reset = await readTodos();
      await writeTodos(reset);
      console.log(reset);
      break;

    case 'list':
      readTodos().then(console.log);
      break;

    case 'help':
      console.log('commands :');
      console.log('');
      console.log('add : to add to-do');
      console.log('remove : to remove a to-do');
      console.log('reset : to remove all the to-dos');
      console.log('list : to see all the to do');
      break;

    default:
      console.log('commands:');
      console.log('');
      console.log('add : to add to-do');
      console.log('remove : to remove a to-do');
      console.log('reset : to remove all the to-dos');
      console.log('list : to see all the to-dos');
  }
}

main();
