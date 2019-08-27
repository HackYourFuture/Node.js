'use strict';

// TODO: Write the homework code in this file
const program = require('commander');
const commands = require('./commands');
const addToDoList = require('./addToDos');
const showList = require('./showList');
const remove = require('./removeList');
const reset = require('./resetList');
if (process.argv.length === 2) {
  commands.showCommandsList();
} else {
  program
    .command('help')
    .alias('hp')
    .description('Shows list of commands')
    .action(() => {
      commands.showCommandsList();
    });

  program
    .command('add <toDo>')
    .alias('a')
    .description('Adds a to-do item')
    .action(toDo => {
      addToDoList.generateToDosList(toDo);
    });

  program
    .command('list')
    .alias('ls')
    .description('Shows current to-dos')
    .action(() => {
      showList.showToDosList();
    });

  program
    .command('remove <index>')
    .alias('rm')
    .description('Removes a to-do item')
    .action(index => {
      remove.removeList(index);
    });
  program
    .command('reset')
    .alias('rs')
    .description('Removes all to-do items from the list')
    .action(() => {
      reset.resetList();
    });
  program.parse(process.argv);
}
