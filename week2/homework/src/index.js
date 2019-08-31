'use strict';

const program = require('commander');
const data = require('./todo.js');

if (process.argv.length < 3) {
  data.help();
}
 else {
  program
    .command('help')
    .description('Shows list of commands')
    .action(() => {
      data.help();
    });

  program
    .command('add <toDo>')
    .description('Adds a todo item')
    .action(todo => {
      data.addTodo(todo);
      data.listTodo();
    });

  program
    .command('list')
    .description('Shows current todo items')
    .action(() => {
      data.listTodo();
    });

  program
    .command('remove')
    .description('Removes a todo by index')
    .action(index => {
      data.deleteTodo(index);
    });

  program
    .command('reset')
    .description('Removes all todo items')
    .action(() => {
      data.resetTodo();
      data.listTodo();
    });

  program
    .command('update')
    .description('Updates a todo by index')
    .action((index, todo) => {
      data.updateTodo(index, todo);
      data.listTodo();
    });

  program.parse(process.argv);
}
