'use strict';

const fs = require('fs');
const readAndParseTodos = require('./readAndparse');
require('./list');
const update = (todo) => {
  const parsedTodos = readAndParseTodos();
  let index = parseInt(process.argv[3]);
  let updatedToDo = {
    todo
  };

  if (!parsedTodos) {
    console.log('The TODO list file is empty');
  }
 else if (index > parsedTodos.length) {
    console.log(`the requested item with index ${index} is empty`);
  }
 else {
    parsedTodos.splice(index - 1, 1, updatedToDo);
    const restItems = JSON.stringify(parsedTodos);
    fs.writeFileSync('todos.json', restItems);
    console.log('updated');
  }
};

module.exports = update;
