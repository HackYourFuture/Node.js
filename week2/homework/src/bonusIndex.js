'use strict';

const program = require('commander');
const functions = require('./bonusFunctions');

program
  .command('help')
  .alias('h')
  .description('Lists all the commands and a short description for each of them.')
  .action(() => functions.help());

program
  .command('list')
  .alias('l')
  .description('Shows current to-dos, or shows an appropriate text if there are no to-dos.')
  .action(() => functions.list());

program
  .command('add <to-do_item>')
  .alias('a')
  .description(
    'Adds a to-do item. All the words behind add are entered as 1 to-do item to the list.',
  )
  .action(() => functions.add());

program
  .command('remove <index-number>')
  .alias('rm')
  .description('Removes a to-do item by its 1-base index.')
  .action(() => functions.remove());

program
  .command('reset')
  .alias('rs')
  .description('Removes all to-do items from the list.')
  .action(() => functions.reset());

program
  .command('update <index-number> <toDo>')
  .alias('u')
  .description('Updates a to-do item with new text')
  .action(() => functions.update());

program.parse(process.argv);
if (process.argv.length < 3) program.help();
