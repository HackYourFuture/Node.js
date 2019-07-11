'use strict';
const args = process.argv.slice(2);
const command = args[0];
const todoItem = args[1];
const newVal = args[2];

const help = require('./help');
const list = require('./list');
const add = require('./add');
const remove = require('./remove');
const reset = require('./reset');
const update = require('./update');

switch (command) {
  case 'list':
    list().then(toDos => console.log(toDos));
    break;
  case 'add':
    add(todoItem).then(toDos => console.log(toDos));
    break;
  case 'remove':
    remove(todoItem).then(toDos => console.log(`You still have to do: \n${toDos}`));
    break;
  case 'reset':
    reset().then(toDos => console.log(`There is nothing to be done \n${toDos}`));
    break;
  case 'update':
    update(todoItem, newVal).then(toDos => console.log(toDos));
    break;

  default:
    help();
    break;
}
