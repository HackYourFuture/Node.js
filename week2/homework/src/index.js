'use strict';

const {
  appendFile,
  readFile,
  writeFile
} = require('fs');
const {
  promisify
} = require('util');

const appendFileWithPromise = promisify(appendFile);
const readFileWithPromise = promisify(readFile);
const writeFileWithPromise = promisify(writeFile);



const TODO_FILE = 'todo.json';

async function main() {
  const [, , cmd, ...args] = process.argv;

  switch (cmd) {
    case 'add':
      {
        const data = await readFileWithPromise(TODO_FILE, 'utf8').catch(() => '[]');
        const todos = JSON.parse(data);
        const newTodo = args.join(' ');
        todos.push(newTodo);
        await writeFileWithPromise(TODO_FILE, JSON.stringify(todos));
        break;
      }
    case 'list':
      {
        const data = await readFileWithPromise(TODO_FILE, 'utf8').catch(() => '[]');
        const todos = JSON.parse(data);
        console.info(todos);
        break;
      }
    case 'reset':
      {
        await writeFileWithPromise(TODO_FILE, JSON.stringify([]));
        const data = await readFileWithPromise(TODO_FILE, 'utf8').catch(() => '[]');
        const todos = JSON.parse(data);
        console.info('To-dos:', todos);
        break;
      }

    case 'remove':
      {
        const value = args[0];
        if (value <= todos.length && value > +0) {
          const removedItem = todos[value - 1];
          todos.splice(value - 1, 1);
          await wirteToDos();
          console.info(removedItem + ' : is  Removed from your TO-DO list!');
          if (todos.length === 0)
            console.info('TODOS is EMPTY NOW!!!');
        } else {
          console.log('Item number is out of range ');
        }
        break;
      }
    case 'help':
    default:
      console.info('Some help',
        'List :Shows current to-dos list',
        'add : Adds a to-do item. All the words behind add are entered as 1 to-do item to the list.',
        'remove: Removes a to-do item by its 1-base index,, e.g. to remove second item',
        'reset: Removes all to-do items from the list');
      break;
  }
}
main();