'use strict';

const commander = require('commander');

const program = new commander.Command();

// Configure Command Line Interface -Options-
program
  .version('1.0.0')
  .option('-l, --list', 'Lists all the to-do list.')
  .option('-a, --add <title>', 'Adds a new to-do item with the provided title.')
  .option(
    '-rm, --remove <id>',
    `Removes the to-do item from the list \
    if it finds one with the id provided.`,
    parseInt
  )
  .option('-rs, --reset', 'Removes all the to-do items from the list.');

// Configure Command Line Interface -Commands-
program
  .command('list')
  .alias('ls')
  .description('Lists all the to-do list.')
  .action(async () => {
    await program.listManager.listTodos();
  });

program
  .command('add <title>')
  .alias('a')
  .description('Adds a new to-do item with the provided title.')
  .action(async title => {
    await program.listManager.addTodo(title);
  });

program
  .command('update <id> <newTitle>')
  .alias('u')
  .description(
    `Updates the to-do item's title with the new title \
  of which id number matches with the id number provided`
  )
  .action(async (id, title) => {
    await program.listManager.updateTodo(id, title);
  });

program
  .command('remove <id>')
  .alias('rm')
  .description(
    `Removes the to-do item from the list \
  if it finds one with the id provided.`
  )
  .action(async id => {
    await program.listManager.removeTodo(id);
  });

program
  .command('reset')
  .alias('rs')
  .description('Removes all the to-do items from the list.')
  .action(async () => {
    await program.listManager.resetTodos();
  });

module.exports = program;
