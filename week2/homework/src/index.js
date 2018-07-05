'use strict';

const { readTODOs, writeTODOs } = require('./fileOperations');
const { displayTodos, editAndWrite } = require('./listOperations');

const filePath = 'TODOs2.txt';
const cmd = process.argv[2];
const parameters = process.argv.slice(3);

main();

async function main() {
  const todos = await readTODOs(filePath);
  switch (cmd) {
    case 'add':
      if (!parameters[0])
        return console.log('error: invalid required argument <to-do>');
      try {
        todos.push(parameters[0]);
        await writeTODOs(filePath, todos);
        displayTodos(todos);
      }
      catch (error) {
        console.error(error);
      }
      break;
    case 'remove':
      editAndWrite(filePath, parameters[0]);
      break;
    case 'update':
      if (!parameters[1])
        return console.log('error: invalid required argument <to-do>');
      editAndWrite(filePath, parameters[0], parameters[1]);
      break;
    case 'list':
      displayTodos(todos);
      break;
    case 'reset':
      try {
        await writeTODOs(filePath, []);
        displayTodos([]);
      }
      catch (error) {
        console.error(error);
      }
      break;
    default:
      displayHelp();
  }
}

function displayHelp() {
  console.log(`Usage: node . [options] 
to use commander version: node indexCommander.js [options]

Options:

  list                    output all to-dos
  add <to-do>             add to-do to the list
  remove <index>          delete to-do at index
  update <index> <to-do>  update list at index with to-do
  reset                   delete all to-dos
  help                    output usage information
  default                 output usage information
  `);
}
