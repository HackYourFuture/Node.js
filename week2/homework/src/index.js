'use strict';
// TODO: Write the homework code in this file
'use strict';
const { readFile, writeFile, appendFile } = require('fs');
const { promisify } = require('util');

const readFileWithPromise = promisify(readFile);
const writeFileWithPromise = promisify(writeFile);
const appendFileWithPromise = promisify(appendFile);

const TODO_FILE = 'todo.json';

async function main() {
  const [, , cmd, ...args] = process.argv;
  switch (cmd) {
    case 'list': {
      const data = await readFileWithPromise(TODO_FILE, `utf8`).catch(() => '[]');
      const todos = JSON.parse(data);
      console.info(todos);
      break;
    }

    case 'add': {
      const data = await readFileWithPromise(TODO_FILE, `utf8`).catch(() => '[]');
      const todos = JSON.parse(data);
      const newTodo = args.join(' ');
      todos.push(newTodo);
      await writeFileWithPromise(TODO_FILE, JSON.stringify(todos));
      break;
    }

    case 'remove': {
      const [, , cmd, baseIndex, ...args] = process.argv;
      const index = parseInt(baseIndex);
      const data = await readFileWithPromise(TODO_FILE, `utf8`).catch(() => '[]');
      const todos = JSON.parse(data);

      if ((typeof (index) === 'number' && !isNaN(index))) {
        const todosSize = Object.keys(todos).length;
        if (index > todosSize) {
          console.info(`There is ${todosSize} items in the file choose a number between (1 to ${todosSize} )`);
          return;
        }
        else if (index <= 0) {
          console.info(`Please type a valid number after remove command `);
          return;
        }
        else if (baseIndex == null) {
          console.info(`Please type a number after remove command `);
          return;
        }
        const items = [todos];
        items[0].splice(index - 1, 1);
        let newTodos = items[0];
        await writeFileWithPromise(TODO_FILE, JSON.stringify(newTodos));
        console.info(newTodos);
      }
      else { console.info('Please use number after command'); }
      break;
    }

    case 'reset': {
      await writeFileWithPromise(TODO_FILE, JSON.stringify([]));
      const data = await readFileWithPromise(TODO_FILE, `utf8`).catch(() => '[]');
      const todos = JSON.parse(data);
      console.info(todos);
      break;
    }

    case 'update': {
      const [, , cmd, baseIndex, replacedText, ...args] = process.argv;
      const index = parseInt(baseIndex);
      const data = await readFileWithPromise(TODO_FILE, `utf8`).catch(() => '[]');
      const todos = JSON.parse(data);

      if ((typeof (index) === 'number' && !isNaN(index))) {
        const todosSize = Object.keys(todos).length;
        if (index > todosSize) {
          console.info(`There is ${todosSize} items in the file choose a number between (1 to ${todosSize} )`);
          return;
        }
        else if (index <= 0) {
          console.info(`Please type a valid number after remove command `);
          return;
        }
        else if (baseIndex == null) {
          console.info(`Please type a number after remove command `);
          return;
        }
        const items = [todos];
        items[0].splice(index - 1, 1, replacedText);
        let newTodos = items[0];
        await writeFileWithPromise(TODO_FILE, JSON.stringify(newTodos));
        console.info(newTodos);
      }
      else { console.info('Please use number after command'); }
      break;
    }

    case 'help':
    default:
      console.info('Commands: ');
      const commands = `help: Shows help section.
      list: Shows current to - dos or shows an appropriate text if there are no to - dos.
      add: Adds a to-do item. All the words behind add are entered as 1 to-do item to the list.
      remove: Removes a to-do item by its 1-base index, e.g. to remove second item.
      reset: Removes all to-do items from the list.`;
      console.info(commands);
      break;
  }
}
main(); 
