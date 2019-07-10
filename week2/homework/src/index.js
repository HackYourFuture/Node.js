'use strict';
const fs = require('fs');
const add = require('./add.js');
const reset = require('./reset.js');
const list = require('./list.js');
const remove = require('./remove.js');
const update = require('./update.js');
const help = require('./help.js');
const command = process.argv[2];
const invalidTextMessage = 'WARN: nothing to add ! type sth for your toDoList!';

switch (command) {
  case 'add':
    if (process.argv[3]) {
      if (process.argv[4]) {
        console.log('WARN: please type the toDo item without spaces. you can use dash ( - )');
      } else {
        add.add(process.argv[3]);
      }
    } else {
      console.log(invalidTextMessage);
    }
    break;
  case 'reset':
    reset.reset();
    break;
  case 'list':
    if (process.argv[3]) {
      console.log('WARN: the "list" command doesn\'t take arguments');
    } else {
      list.list();
    }
    break;
  case 'remove':
    remove.remove(process.argv[3]);
    break;
  case 'update':
    if (process.argv[5]) {
      console.log('WARN: please type the toDo item without spaces. you can use dash ( - )');
    } else {
      update.update(process.argv[3], process.argv[4]);
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
