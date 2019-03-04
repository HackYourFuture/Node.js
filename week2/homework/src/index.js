'use strict';

// TODO: Write the homework code in this file

const program = require('commander');
const functions = require('./functions');

const list = functions.list;
const add = functions.add;
const remove = functions.remove;
const reset = functions.reset;
const help = functions.help;
const update = functions.update;

if (!process.argv[2]) {
  help();
} else if (process.argv[3].substring(0, 1) === '-') {
  console.log('Please write a positive number!');
} else {
  program
    .command('help')
    .description('to get help')
    .action(() => {
      help();
    });

  program
    .command('list')
    .description('to list to-dos')
    .action(() => {
      list();
    });

  program
    .command('add <newToDo>')
    .description('to add a new to-do')
    .action(newToDo => {
      add(newToDo);
    });

  program
    .command('remove <toDoNumber>')
    .description('to remove an existing to-do')
    .action(toDoNumber => {
      remove(toDoNumber);
    });

  program
    .command('reset')
    .description('to reset all to-dos')
    .action(() => {
      reset();
    });

  program
    .command('update <existingToDoNumber> <updatedToDo>')
    .description('to list to-dos')
    .action((toDoNumber, newToDo) => {
      update(toDoNumber, newToDo);
    });

  program.parse(process.argv);
}
