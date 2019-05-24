const { add, list, remove, reset, update, help } = require('./methodList.js');

let args = process.argv.slice(2);

let command = args[0];
let todoItem = args[1];
let todoValue = args[2];

command === 'add'
  ? add(todoItem)
  : command === 'list'
  ? list(todoItem)
  : command === 'remove'
  ? remove(todoItem)
  : command === 'reset'
  ? reset(todoList)
  : command === 'update'
  ? update(todoItem, todoValue)
  : help();
