'use strict';

const { appendFile, readFile, writeFile } = require('fs');
const { promisify } = require('util');
const appendFileWithPromise = promisify(appendFile);
const readFileWithPromise = promisify(readFile);
const writeFileWithPromise = promisify(writeFile);
const TODO_FILE = 'todo.json';

async function main() {
  const [, , cmd, ...args] = process.argv;

  switch (cmd) {
    case 'help':
    default:
      console.log(`
      options : 
      1) help : show help section.
      2) add : add a todo item. (node . add "")
      3) list: show current todo's list.(node . list)
      4) remove: remove a todo item (node . remove "the index number")
      5) reset: remove all items from the list. (node . reset)
      6) update: update any item from todo list with a new item (node . update "new item")
`);
      break;
    case 'add': {
      const data = await readFileWithPromise(TODO_FILE, 'utf8').catch(() => '[]');
      const todos = JSON.parse(data);
      const newTodo = args.join(' ');
      console.log(newTodo)
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
      break;
    }
    case 'remove': {
      const data = await readFileWithPromise(TODO_FILE, 'utf-8').catch(() => '[]');
      const todos = JSON.parse(data);
      let removeIndex = args.join();
      removeIndex = Number(removeIndex) - 1
      todos.splice(removeIndex, 1)
      await writeFileWithPromise(TODO_FILE, JSON.stringify(todos));
      break;
    }
    case 'update': {
      const data = await readFileWithPromise(TODO_FILE, 'utf8').catch(() => '[]');
      const todos = JSON.parse(data);
      const updateIndex = Number(args[0]) - 1;
      console.log(updateIndex);
      todos.splice(updateIndex, 1, args[1])
      await writeFileWithPromise(TODO_FILE, JSON.stringify(todos));
      break;
    }
  }
}

main();
