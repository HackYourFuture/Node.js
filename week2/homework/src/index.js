'use strict';

const { readTODOs, writeTODOs } = require('./fileOperations');
const filePath = 'TODOs2.txt';

const cmd = process.argv[2];
const parameters = process.argv.slice(3);

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
    return console.log('TODOs list is now empty, use ADD command to add some!');
  todos.forEach((element, index) => {
    console.log(`${index + 1}- ${element}`);
  });
}

async function editAndWrite(list, index, item) {
  if (isNaN(index)) return displayHelp();
  if (index > list.length || index < 1)
    return console.log(`TODO #${index} isn't in the list`);
  item ? list.splice(index - 1, 1, item) : list.splice(index - 1, 1);
  try {
    await writeTODOs(filePath, list);
    displayTodos(list);
  }
  catch (error) {
    console.error(error);
  }
}

async function main() {
  const todos = await readTODOs(filePath);
  switch (cmd) {
    case 'add':
      if (!parameters[0]) return displayHelp();
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
      editAndWrite(todos, parameters[0]);
      break;
    case 'update':
      if (!parameters[1]) return displayHelp();
      editAndWrite(todos, parameters[0], parameters[1]);
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

main();
