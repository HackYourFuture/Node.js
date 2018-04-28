'use strict';

// TODO: Write the homework code in this file

const { readFile, writeFile } = require('fs');

const { promisify } = require('util');


const appendFileWithPromise = promisify(appendFile);
const readFileWithPromise = promisify(readFile);
const writeFileWithPromise = promisify(writeFile);

const TODO_FILE = 'todo.json';

async function main() {
  const [, , cmd, ...args] = process.argv;

  switch (cmd) {
    case 'add': {
      const data = await readFileWithPromise(TODO_FILE, 'utf8').catch(() => '[]');
      const todos = JSON.parse(data);
      const newTodo = args.join(' ');
      todos.push(newTodo);
      await writeFileWithPromise(TODO_FILE, JSON.stringify(todos));
      break;
    }
    case 'list': {
      const data = await readFileWithPromise(TODO_FILE, 'utf8').catch(() => '[]');
      const todos = JSON.parse(data);
      console.info(todos);
      break;
    }
    case 'reset': {
      await writeFileWithPromise(TODO_FILE, JSON.stringify([]));
      const data = await readFileWithPromise(TODO_FILE, 'utf8').catch(() => '[]');
      const todos = JSON.parse(data);
      console.info('To-dos:', todos);
      break;
    }
    case 'remove':
      break;
    case 'help':
    default:
      console.info('Some help');
      break;
  }
}

main();