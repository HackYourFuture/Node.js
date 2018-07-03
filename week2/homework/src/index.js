'use strict';

const { readFile, writeFile } = require('fs');
const { promisify } = require('util');

const readWithPromise = promisify(readFile);
const writeWithPromise = promisify(writeFile);
const filePath = 'TODOs2.txt';

const cmd = process.argv[2];
const parameters = process.argv.slice(3);

function readTODOs() {
  return readWithPromise(filePath, 'utf8')
    .then(JSON.parse)
    .catch(() => ([]));
}

function writeTODOs(toDos) {
  return writeWithPromise(filePath, JSON.stringify(toDos, null, 2))
    .catch(() => 'File writing error');
}

function displayHelp() {
  console.log(`Usage: node . [options] 

Options:

  list                    display all to-dos
  add [to-do]             add to-do to the list
  remove [index]          delete to-do at index
  update [index] [to-do]  update list at index with to-do
  reset                   delete all to-dos
  help                    show this help text
  default                 show this help text
  `);
}

function displayTodos(todos) {
  if (todos.length === 0)
    return console.log('TODOs list is now empty, use ADD command to add some!.');
  todos.forEach((element, index) => {
    console.log(`${index + 1}- ${element}`);
  });
}

async function main() {
  const todos = await readTODOs();
  async function edit(index, todo) {
    if (isNaN(index)) return displayHelp();
    if (index > todos.length || index < 1)
      return console.log(`TODO #${index} isn't in the list`);
    todo ? todos.splice(index - 1, 1, todo) : todos.splice(index - 1, 1);
    try {
      await writeTODOs(todos);
      displayTodos(todos);
    }
    catch (error) {
      console.error(error);
    }
  }
  switch (cmd) {
    case 'add':
      if (!parameters[0]) return displayHelp();
      try {
        todos.push(parameters[0]);
        await writeTODOs(todos);
        displayTodos(todos);
      }
      catch (error) {
        console.error(error);
      }
      break;
    case 'remove':
      edit(parameters[0]);
      break;
    case 'update':
      if (!parameters[1]) return displayHelp();
      edit(parameters[0], parameters[1]);
      break;
    case 'list':
      displayTodos(todos);
      break;
    case 'reset':
      try {
        await writeTODOs([]);
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

main();
