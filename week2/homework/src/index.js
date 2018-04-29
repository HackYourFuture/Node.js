'use strict';

// TODO: Write the homework code in this file

const { readFile, writeFile } = require('fs');

const { promisify } = require('util');


//const appendFileWithPromise = promisify(appendFile);
const readFileWithPromise = promisify(readFile);
const writeFileWithPromise = promisify(writeFile);

const TODO_FILE = 'todo.json';

async function main() {
  const [, , cmd, ...args] = process.argv; // process.argv is a global variable.

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
      break;
    }
    case 'remove': {
      const data = await readFileWithPromise(TODO_FILE, 'utf8').catch(() => '[]');
      const todos = JSON.parse(data);
      const indexOfElementToBeRemoved = parseInt(args[0], 10);
      todos.splice(indexOfElementToBeRemoved - 1, 1);
      await writeFileWithPromise(TODO_FILE, (JSON.stringify(todos)));
      break;
    }
    case 'update': {
      const data = await readFileWithPromise(TODO_FILE, 'utf8').catch(() => '[]');
      const todos = JSON.parse(data);
      const indexOfElementToBeRemoved = parseInt(args[0], 10);
      const updatedTodo = args.slice(1).join(' ');
      todos.splice(indexOfElementToBeRemoved - 1, 1, updatedTodo);

      await writeFileWithPromise(TODO_FILE, (JSON.stringify(todos)));
      break;
    }
    case 'help':
    default:
      console.info('These are valid options: \n\
        \"node . help\"  - displays help menu \n\
        \"node . list\" - displays current to-do list \n\
        \"node . add [to do-list item]\" - adds to-do list item \n\
        \"node . remove [index number]\" - removes a to-do item by index number. \n\
        \"node . update [index number, task]\" - updates a to-do item at index wth something else.\n\
        \"node . reset\" - removes all items from list.');
      break;
  }
}

main();