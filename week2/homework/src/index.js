'use strict';

// TODO: Write the homework code in this file
const yargs = require('yargs').help(false);
const commands = require('./commands');

const command = yargs.argv._[0];
const todo = yargs.argv.todo;

switch (command) {
  default:
    console.log(
      'In case you came across with a problem, read the the implementation of the commands carefully and try again!'
    );
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
    commands.list();

    break;
  case 'update':
    if (todo) {
      commands.update(todo);
    }
    break;
  case 'reset':
    commands.reset();

    break;
}
