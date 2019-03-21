#!/usr/bin/env node
'use strict';

const reader = require('./readTodo');
const adder = require('./addToDo');
const remover = require('./removeTodo');
const update = require('./updateTodo');
const reset = require('./resetTodo');
const helper = require('./help');

const command = process.argv[2];
const file = process.argv[3];
const task = process.argv[4];
// console.log(process.argv); // to remove
switch (command) {
  case 'list':
    reader.read(file);
    break;
  case 'add':
    adder.add(file, task);
    break;
  case 'remove':
    remover.remove(file, task);
    break;
  case 'reset':
    reset.reset(file);
    break;
  case 'update':
    update.update(file, index, process.argv[5]);
    break;
  case 'help':
    helper.log();
    break;
  default:
    helper.log();
    break;
}
