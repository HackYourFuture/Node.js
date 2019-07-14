'use strict';

// TODO: Write the homework code in this file

const add = require('./add.js');
const remove = require('./remove.js');
const reset = require('./reset.js');
const list = require('./list.js');

const command = process.argv[2];
const toDoText = process.argv[3];
const instructions =
  '<help> : To show instructions \n<list>: To show your toDoList\n<reset>: To clear your toDoList\n<add>: To add toDo things in your list\n<remove index>: To remove item of a specific index. ';

if (command === 'add') {
  add(toDoText);
} else if (command === 'help') {
  console.log(instructions);
} else if (command === 'remove') {
  remove(toDoText);
} else if (command === 'list') {
  list(toDoText);
} else if (command === 'reset') {
  reset(toDoText);
} else {
  console.log('This is not a command, please write appropriate word.');
  console.log(instructions);
}
