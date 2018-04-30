'use strict';
const { readFile, writeFile } = require('fs');
const { promisify } = require('util');
const readFileWithPromise = promisify(readFile);
const writeFileWithPromise = promisify(writeFile);
const TODO_FILE = 'todo.json';

async function main() {
  const [, , cmd, ...args] = process.argv;
  switch (cmd) {
    case 'list': {
      const todos = await readTodos();
      console.info(todos);
      break;
    }
    case 'add': {
      const todos = await readTodos();
      todos.push(args.join(' '));
      await writeTodos(todos);
      break;
    }
    case 'reset': {
      await writeTodos([]);
      console.info(await readTodos());
      break;
    }
    case 'remove': {
      const index = parseInt(args[0]);
      const todos = await readTodos();
      if ((typeof (index) === 'number' && !isNaN(index))) {
        if (todos.length === 0) {
          console.info('TODOS is empty');
          return;
        }
        if (index <= 0 || index > todos.length) {
          console.info(`There is ${todos.length} items in the file choose a number between (1 to ${todos.length} )`);
          return;
        }
        todos.splice(index - 1, 1);
        await writeTodos(todos);
        console.info(todos);
      }
      else { console.info('Please use number after command'); }
      break;
    }
    case 'update': {
      const index = parseInt(args[0]);
      const replacedText = args[1];
      const todos = await readTodos();
      if ((typeof (index) === 'number' && !isNaN(index))) {
        if (todos.length === 0) {
          console.info('TODOS is empty');
          return;
        }
        if (index <= 0 || index > todos.length) {
          console.info(`There is ${todos.length} items in the file choose a number between (1 to ${todos.length} )`);
          return;
        }
        todos.splice(index - 1, 1, replacedText);
        await writeTodos(todos);
        console.info(todos);
      }
      else { console.info('Please use a number and a text after command'); }
      break;
    }
    case 'help':
    default:
      const commands = `Commands: 
      help: Shows help section.
      list: Shows current to - dos or shows an appropriate text if there are no to - dos.
      add: Adds a to-do item. All the words behind add are entered as 1 to-do item to the list.
      remove: Removes a to-do item by its 1-base index, e.g. to remove second item.
      reset: Removes all to-do items from the list.`;
      console.info(commands);
      break;
  }
}
main();
function readTodos() {
  return readFileWithPromise(TODO_FILE, 'utf8').then(
    JSON.parse,
    () => []
  );
}
function writeTodos(todos) {
  return writeFileWithPromise(TODO_FILE, JSON.stringify(todos));
}
