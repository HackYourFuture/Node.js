'use strict';
// TODO: Write the homework code in this file
const {
  promisify
} = require('util');

const {
  readFile,
  writeFile,
  appendFile
} = require('fs');

const readFileWithPromise = promisify(readFile);
const writeFileWithPromise = promisify(writeFile);
const appendFileWithPromise = promisify(appendFile);

const TODO_FILE = 'todo.json';

async function main() {
  const [, , cmd, ...args] = process.argv;

  switch (cmd) {

    case 'add':
      {
        const data = await readFileWithPromise(TODO_FILE, 'utf-8').catch(() => '[]');
        const todos = JSON.parse(data);
        const newTodo = args.join(' ');
        todos.push(newTodo);
        console.log(newTodo);
        await writeFileWithPromise(TODO_FILE, JSON.stringify(todos));
        break;
      }

    case 'list':
      {
        const data = await readFileWithPromise(TODO_FILE, 'utf-8').catch(() => '[]');
        const todos = JSON.parse(data);
        console.info(todos);
        break;
      }

    case 'remove':
      const data = await readFileWithPromise(TODO_FILE, 'utf-8').catch(() => '[]');
      const todos = JSON.parse(data);
      const index = args - 1;
      const result = todos[index];

      if (index <= todos.length - 1 && index > -1) {
        todos.splice(index, 1);
        await writeFileWithPromise(TODO_FILE, JSON.stringify(todos));
        console.info(result + ' : has been REMOVED!!!');
        if (todos.length === 0) {
          console.info('TODOS is EMPTY NOW!!!');
        }

      } else {
        console.info('The TODO-ITEM is not exist...!');
      }

      break;

    case 'reset':
      {
        await writeFileWithPromise(TODO_FILE, JSON.stringify([]));
        console.info('ToDo\'s is EMPTY now!!!');
        break;
      }

    case 'help':
    default:
      console.info(
        'Hello to my CLI >>> You have 5 choices : \n 1. Adds a to-do item: add todo-nam' +
        'e\n 2. List All Todos: list\n 3. Removes a to-do item by its 1-base index: rem' +
        'ove todo-index\n 4. Removes all to-do items from the list: reset\n 5. Updates ' +
        'a to-do item with new text: update todo-index your-update '

      );
      break;

  }

}
main();