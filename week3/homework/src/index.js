'use strict';
const fs = require('fs');
if (!fs.existsSync('./todos.json')) {
  fs.writeFileSync('todos.json', '[]');
}
const add = require('./add.js');
const reset = require('./reset.js');
const list = require('./list.js');
const remove = require('./remove.js');
const update = require('./update.js');
const help = require('./help.js');
const command = process.argv[2];
const invalidTextMessage = 'WARN: nothing to add or update!';
try {
  switch (command) {
    case 'add':
      if (process.argv[3]) {
        add.add(process.argv.splice(3, process.argv.length).join(' '));
        console.log(`item added to list`);
      } else {
        console.log(invalidTextMessage);
      }
      break;
    case 'reset':
      reset.reset();
      console.log('list cleared');
      break;
    case 'list':
      if (process.argv[3]) {
        console.log('WARN: the "list" command doesn\'t take arguments');
      } else {
        console.log(list.list());
      }
      break;
    case 'remove':
      remove.remove(process.argv[3]);
      console.log('item removed');
      break;
    case 'update':
      if (!process.argv[4]) {
        console.log('WARN: missing parameters - index + new toDo item');
      } else {
        update.update(process.argv[3], process.argv.splice(4, process.argv.length).join(' '));
        console.log(`list item updated`);
      }
      break;
    case undefined:
    case 'help':
      if (process.argv[3]) {
        console.log('WARN: "HELP" doesn\'t take parameters');
        help.help([help, list, add, remove, update, reset]);
      } else {
        help.help([help, list, add, remove, update, reset]);
      }
      break;
    default:
      console.log(`WARN: ${command} is not a command. Please check command list`);
      help.help([help, list, add, remove, update, reset]);
  }
} catch (error) {
  console.log(error);
}
