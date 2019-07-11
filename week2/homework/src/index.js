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
    list().then(data => console.log(data));
    break;
  case 'add':
    add(todoItem).then(data => console.log(data));
    break;
  case 'remove':
    remove(todoItem).then(data => console.log(`You still have to do: \n${data}`));
    break;
  case 'reset':
    reset().then(data => console.log(`There is nothing to be done \n${data}`));
    break;
  case 'update':
    update(todoItem, newVal).then(data => console.log(data));
    break;

  default:
    help();
    break;
}
