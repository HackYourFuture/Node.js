'use strict';

const program = require('commander');
const { readTODOs, writeTODOs } = require('./fileOperations');
const { displayTodos, editAndWrite } = require('./listOperations');

const filePath = 'TODOs2.txt';

mainCommander();

async function mainCommander() {
  const todos = await readTODOs(filePath);

  program
    .version('0.0.1')
    .command('list')
    .description('output all to-dos')
    .action(() => displayTodos(todos));
  program
    .command('help')
    .description('output usage information')
    .action(() => program.outputHelp());
  program
    .command('add <item>')
    .description('add item to the list')
    .action(async function(item) {
      try {
        todos.push(item);
        await writeTODOs(filePath, todos);
        displayTodos(todos);
      }
      catch (error) {
        console.error(error);
      }
    });
  program
    .command('reset')
    .description('delete all to-dos')
    .action(async function() {
      try {
        await writeTODOs(filePath, []);
        displayTodos([]);
      }
      catch (error) {
        console.error(error);
      }
    });
  program
    .command('remove <index>')
    .description('delete to-do at index')
    .action((index) => editAndWrite(filePath, index));
  program
    .command('update <index> <item>')
    .description('update list at index with item')
    .action((index, item) => editAndWrite(filePath, index, item));
  program.parse(process.argv);
  if (process.argv.length < 3) program.outputHelp();
}
