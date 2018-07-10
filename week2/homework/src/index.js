'use strict';
const actions = require('./actions');

const args = process.argv.slice(2);
const cmd = args[0];

async function main() {
  const userIndexInput = parseInt(args[1]);
  const allTodos = await actions.readJSON();

  switch (cmd) {
    case 'add':
      actions.addTodo(allTodos);
      break;
    case 'remove':
      actions.removeTodo(userIndexInput, allTodos);
      break;
    case 'list':
      actions.listTodos(allTodos);
      break;
    case 'done':
      actions.markTodoAsDone(userIndexInput, allTodos);
      break;
    case 'update':
      actions.updateTodo(userIndexInput, allTodos);
      break;
    case 'reset':
      actions.resetTodos();
      break;
    case 'help':
    default:
      console.log(actions.helpMessages.help);
  }
}
main();
