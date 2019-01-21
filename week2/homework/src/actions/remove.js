/* eslint-disable no-constant-condition */
'use strict';

const fs = require('fs');
const readAndParseTodos = require('./readAndparse');
let remove = () => {
  let parsedTodos = readAndParseTodos();
  let commandArg = parseInt(process.argv[3]);

  if (parsedTodos.length === 0) {
    console.log('The TODO list file is empty');
  }
 else if (commandArg > parsedTodos.length) {
    console.log(`the requested line number ${commandArg} is empty`);
  }
 else {
    let removedItem = JSON.stringify(parsedTodos[commandArg - 1]);
    parsedTodos.splice(commandArg - 1, 1);
    const restItems = JSON.stringify(parsedTodos);
    fs.writeFileSync('todos.json', restItems);
    console.log(`the removed todo item is : \n - ${removedItem}`);
  }
};

module.exports = remove;
