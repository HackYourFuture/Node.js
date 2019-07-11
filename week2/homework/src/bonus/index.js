'use strict';

const program = require('commander');

const FILE_PATH = './todos.json';

const { add, list, remove, reset, update } = require('./actions');

program
  .command('list')
  .description('List todos')
  .alias('l')
  .action(() => list(FILE_PATH));

program
  .command('add [todos...]')
  .description('Add todo(s) to the list')
  .alias('a')
  .action(todos => add(FILE_PATH, todos));

program
  .command('update <order> <newTodo>')
  .description('Update todo in specified line with new todo')
  .alias('u')
  .action((order, newTodo) => update(FILE_PATH, order, newTodo));

program
  .command('remove <order>')
  .description("Remove todo by it's line number")
  .alias('rm')
  .action(order => remove(FILE_PATH, order));

program
  .command('reset')
  .description('Delete all todos')
  .alias('rs')
  .action(() => reset(FILE_PATH));

program.parse(process.argv);

if (process.argv.length < 3) program.help();
