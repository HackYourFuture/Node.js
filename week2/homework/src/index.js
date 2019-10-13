'use strict';

const commander = require('commander');

const program = new commander.Command();

// Configure Command Line Interface
program
  .version('1.0.0')
  .option('-l, --list', 'Lists all the to-do list.')
  .option('-a, --add <title>', 'Adds a new to-do item with the provided title.')
  .option(
    '-rm, --remove <id>',
    'Removes the to-do item from the list if it finds one with the id provided.',
    parseInt
  )
  .option('--reset', 'Removes all the to-do items from the list.')
  .parse(process.argv);
