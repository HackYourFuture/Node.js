'use strict';

// import actions
const { list, add, remove, reset, update, help } = require('./actions');

const args = process.argv.slice(2);
const command = args[0];
const todoItem = args[1];
const updatedItem = args[2];

switch (command) {
  case 'list':
    list();
    break;
  case 'add':
    add(todoItem);
    break;
  case 'remove':
    remove(todoItem);
    break;
  case 'reset':
    reset();
    break;
  case 'update':
    update(todoItem, updatedItem);
    break;
  case 'help':
  default:
    help();
    break;
}
