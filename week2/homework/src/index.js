'use strict';
const list = require('./list');
const help = require('./help');
const add = require('./add');
const remove = require('./remove');
const reset = require('./reset');
const args = process.argv.slice(2);

const command = args[0];
const toDoList = args[1];

if (command === undefined || command === 'help') {
  help(toDoList);
}
 else if (command === 'add') {
  add(toDoList);
}
 else if (command === 'list') {
  list(toDoList);
}
 else if (command === 'remove') {
  remove(toDoList);
}
 else if (command === 'reset') {
  reset(toDoList);
}
 else {
  console.log(`${command} is not exist , please see help command for more details`);
}
