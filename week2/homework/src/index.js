'use strict';

// TODO: Write the homework code in this file
const yargs = require('yargs');
const commands = require('./commands');

let command = yargs.argv._[0];
let todo = yargs.argv.todo;

switch (command) {
  default:
    commands.help();
    break;
  case '--help':
    commands.help();
    break;
  case 'add':
    if (todo) {
      commands.add(todo);
    }
    break;
  case 'remove':
    if (todo) {
      commands.remove(todo);
    }
    break;
  case 'list':
    if (todo) {
      commands.list(todo);
    }
    break;
  case 'reset':
    if (todo) {
      commands.reset();
    }
    break;
}
