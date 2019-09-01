'use strict';

// TODO: Write the homework code in this file
console.log('Running app.js');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');
const todos = require('./todos.js');
const help = require('./help.txt');

const argv = yargs.argv;
let command = argv._[0];

console.log('Running Command: ', command);
if (command === 'help') {
  console.log(help);
}
if (command === 'reset') {
  todos.reset();
}
if (command === 'addTodo') {
  todos.addTodo(argv.title);
} else if (command === 'deleteTodo') {
  let todoDeleted = todos.deleteTodo(argv.title);
  let message = todoDeleted ? 'Todo was deleted' : 'Todo not found';
  console.log(message);
} else if (command === 'readTodo') {
  let todo = todos.readTodo(argv.title);
  if (todo) {
    console.log('Great! The todo was found.');
    todos.logTodo(todo);
  } else {
    console.log('Whoops! The todo was not found.');
  }
} else if (command === 'listTodos') {
  let allTodos = todos.listTodos();
  console.log(`Printing ${allTodos.length} todo(s).`);
  allTodos.forEach(todo => todos.logTodo(todo));
} else {
  console.log('Invalid command.');
}
