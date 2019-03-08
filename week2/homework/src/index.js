'use strict';

const help = require('./help');
const listTodos = require('./list');
const reset = require('./reset');
const addTodo = require('./add');
const removeTodo = require('./remove');
const updateTodo = require('./update');

const command = process.argv[2];

switch (command) {
  case 'list':
    listTodos();
    break;
  case 'add':
    const newTodo = process.argv.slice(3).join(' ');
    addTodo(newTodo);
    break;
  case 'update':
    const todoIndex = process.argv[3];
    const newValue = process.argv.slice(4).join(' ');
    updateTodo(todoIndex, newValue);
    break;
  case 'remove':
    const index = process.argv[3];
    removeTodo(index);
    break;
  case 'reset':
    reset();
    break;
  default:
    console.log('You should write a proper command after index.js See below:\n');
    help();
}
