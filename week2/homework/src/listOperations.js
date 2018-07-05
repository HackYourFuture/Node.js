'use strict';

const { readTODOs, writeTODOs } = require('./fileOperations');

function displayTodos(todos) {
  if (todos.length === 0)
    return console.log('TODOs list is now empty, use ADD command to add some!');
  todos.forEach((element, index) => {
    console.log(`${index + 1}- ${element}`);
  });
}

async function editAndWrite(filePath, index, item) {
  const list = await readTODOs(filePath);
  if (isNaN(index))
    return console.log('error: invalid required argument <index>');
  if (index > list.length || index < 1)
    return console.log(`TODO #${index} isn't in the list!`);
  item ? list.splice(index - 1, 1, item) : list.splice(index - 1, 1);
  try {
    await writeTODOs(filePath, list);
    displayTodos(list);
  }
  catch (error) {
    console.error(error);
  }
}

module.exports = {
  displayTodos,
  editAndWrite
};
