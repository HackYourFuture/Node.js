'use strict';

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const add = require('./add.js');
const deletes = require('./deletes.js');
const list = require('./list.js');
const help = require('./help.js');
const reset = require('./reset.js');

const argv = yargs.argv;

let command = argv._[0];

if (command === 'addTodo') {
  add.addTodo(argv.title);
} else if (command === 'deleteTodo') {
  let todoDeleted = deletes.deleteTodo(argv.title);
  let message = todoDeleted ? 'Todo was deleted' : 'Todo not found';
  console.log(message);
} else if (command === 'listTodos') {
  let allTodos = list.listTodos();
  console.log(`Printing ${allTodos.length} todo(s).`);
  allTodos.forEach(todo => list.logTodo(todo));
} else if (command === 'resetTodo') {
  reset.resetTodo();
  const message = 'All Todos have been removed';
  console.log(message);
} else if (command === 'printHelp') {
  help.printHelp();
} else {
  console.log('Invalid command.');
}
