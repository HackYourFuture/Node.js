'use strict';
// TODO: Write the homework code in this file

const {

  addTodo,
  listTodos,
  removeTodo,
  resetTodo,
  updateTodo,
  help

} = require('./functions');

const [, , cmd, ...args] = process.argv;

async function main() {


  switch (cmd) {

    case 'add':
      {
        addTodo();
        break;
      }

    case 'list':
      {
        listTodos();
        break;
      }

    case 'remove':
      removeTodo();
      break;

    case 'reset':
      {
        resetTodo();
        break;
      }
    case 'update':
      {
        updateTodo();
        break;

      }

    case 'help':
    default:
      help();
      break;

  }

}
main();