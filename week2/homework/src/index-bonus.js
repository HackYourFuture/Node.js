'use strict';

const program = require('commander');
const { add, list, remove, reset, update, handleError } = require('./actions-bonus');

program.description('To Do List CLI Application with Commander and JSON');

program
  .command('help')
  .description('Shows help for this application')
  .action(() => program.help());

program
  .command('list')
  .alias('l')
  .description('Shows to-do list')
  .action(() => {
    list()
      .then(toDos => console.log(`Your to-do list:\n${toDos.trim()}`))
      .catch(error => handleError(error));
  });

program
  .command('add <toDo>')
  .alias('a')
  .description('Adds given argument to end of the list')
  .action(toDo => {
    add(toDo)
      .then(result => console.log(result))
      .catch(error => handleError(error));
  });

program
  .command('remove <lineNumber>')
  .alias('r')
  .description('Removes specified line from the list')
  .action(lineNumber => {
    remove(lineNumber)
      .then(result => console.log(result))
      .catch(error => handleError(error));
  });

program
  .command('reset')
  .description('Removes everything from the list')
  .action(() => {
    reset()
      .then(result => console.log(result))
      .catch(error => handleError(error));
  });

program
  .command('update <lineNumber> <toDo>')
  .alias('u')
  .description('Updates specified line number with given to-do text')
  .action((lineNumber, toDo) => {
    update(lineNumber, toDo)
      .then(result => console.log(result))
      .catch(error => handleError(error));
  });

program.parse(process.argv);

if (process.argv.length < 3) program.help();
