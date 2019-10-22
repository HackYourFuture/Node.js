'use strict';

const program = require('commander');

program
  .version('0.0.1')
  .command('list', 'list all the items', {file: 'list'})
  .command('add <todo>', 'add item to the list', {file: 'add'})
  .command('remove <index>', 'remove an item from the list by index', {file: 'remove'})
  .command('reset', 'remove all items from list', {file: 'reset'})
  .command('update <index> <todo>', 'update to items', {file: 'update'})
  .parse(process.argv);
  
  // help
  if (!program.args.length) program.help();
