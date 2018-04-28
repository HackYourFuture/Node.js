'use strict';
// TODO: Write the homework code in this file

const {

  addTodo,
  listTodos,
  removeTodo,
  resetTodo,
  updateTodo,
  help,
  promisify,
  readFile,
  writeFile,
  appendFile,
  readFileWithPromise,
  writeFileWithPromise,
  appendFileWithPromise,
  TODO_FILE,
  args,
  cmd

} = require('./functions');

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