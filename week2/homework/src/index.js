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
    parseInt,
  )
  .option('-rs, --reset', 'Removes all the to-do items from the list.');

// Configure Command Line Interface -Commands-
program
  .command('list')
  .alias('ls')
  .description('Lists all the to-do list.')
  .action(() => {
    console.warn('List command not implemented yet!');
  });

program
  .command('add <title>')
  .alias('a')
  .description('Adds a new to-do item with the provided title.')
  .action(title => {
    console.warn('Add command not implemented yet!');
  });

program
  .command('update <id> <newTitle>')
  .alias('u')
  .description(
    `Updates the to-do item's title with the new title \
  of which id number matches with the id number provided`,
  )
  .action((id, title) => {
    console.warn('Update command not implemented yet!');
  });

program
  .command('remove <id>')
  .alias('rm')
  .description(
    `Removes the to-do item from the list \
  if it finds one with the id provided.`,
  )
  .action(title => {
    console.warn('Remove command not implemented yet!');
  });

program
  .command('reset')
  .alias('rs')
  .description('Removes all the to-do items from the list.')
  .action(title => {
    console.warn('Reset command not implemented yet!');
  });

// Let the commander process the arguments!
program.parse(process.argv);
