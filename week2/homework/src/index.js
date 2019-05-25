'use strict';

// import actions
const { list, add, remove, reset, update, help } = require('./actions');

const args = process.argv.slice(2);
const command = args[0];
const todoItem = args[1];

switch (command) {
  case 'list':
    list();
    break;
  case 'add':
    add(todoItem);
    break;
  case 'remove':
    remove(index);
    break;
  case 'reset':
    reset();
    break;
  case 'update':
    update(index, updatedItem);
    break;
  case 'help':
  default:
    help();
    break;
}
