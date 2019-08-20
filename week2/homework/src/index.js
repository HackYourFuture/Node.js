'use strict';

const program = require('commander');

program
  .version('0.0.1')
  .description('Yet Another TODO list manager')
  .command('list', 'show current to-dos', { isDefault: true, executableFile: 'list' })
  .command('add <todo>', 'add new to-do item to the list', { executableFile: 'add' })
  .command('remove <index>', 'remove a to-do item from the list by index', {
    executableFile: 'remove'
  })
  .command('reset', 'remove all to-do items from the list', { executableFile: 'reset' })
  .command('update <index> <todo>', 'update a to-do item by index', { executableFile: 'update' })
  .parse(process.argv);
