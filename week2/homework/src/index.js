'use strict';

// TODO: Write the homework code in this file

const { appendFile, readFile, writeFile } = require('fs');

const { promisify } = require('util');

const appendFileWithPromise = promisify(appendFile);
const readFileWithPromise = promisify(readFile);
const writeFileWithPromise = promisify(writeFile);

const toDoFile = 'todo.json';

async function main() {
  const [, , cmd, ...args] = process.argv;

  let value = args[0];
  switch (cmd) {

    case 'add': {
      const data = await readFileWithPromise(toDoFile, 'utf8').catch(() => '[]');
      const todos = JSON.parse(data);
      const newTodo = args.join(' ');
      todos.push(newTodo);
      await writeFileWithPromise(toDoFile, JSON.stringify(todos));
      break;
    }

    case 'list': {
      const data = await readFileWithPromise(toDoFile, 'utf8').catch(() => '[]');
      const todos = JSON.parse(data);
      console.info(todos);
      break;
    }

    case 'reset': {
      await writeFileWithPromise(toDoFile, JSON.stringify([]));
      const data = await readFileWithPromise(toDoFile, 'utf8').catch(() => '[]');
      const todos = JSON.parse(data);
      console.info('The list has been reset!');
      break;
    }

    case 'remove': {
      const data = await readFileWithPromise(toDoFile, 'utf-8').catch(() => '[]');
      const todos = JSON.parse(data);

      if (todos.length === 0) {
        console.info('No items on the list!');
      }
      else if (value > 0 && value <= todos.length) {
        todos.splice(value - 1, 1);
        await writeFileWithPromise(toDoFile, JSON.stringify(todos));
        console.info(' Element is removed from your to-do list!');
      }
      else if (value <= 0 || value > todos.length) {
        console.info(`Enter a number between 1 and ${todos.length}`);
      }
      break;
    }

    case 'help':
    default:
      console.info('Here are the options:',
        'list :Shows the to-do list',
        'add : Adds a to-do item.',
        'remove: Removes a to-do item by index',
        'reset: Delete all the items on the list');
      break;
  }
}

main();
