'use strict';

const printHelp = () => {
  console.log(`
  Node.js Homework Week2 CLI To-do App 
  Main File:        index.js
  Commands: 
  addTodo --title=''............... Adds a To-do
  deleteTodo --title=''............ Deletes a To-do
  listTodos ....................... List all To-dos     
  help ............................ Displays help for the app 
  resetTodo ....................... Removes all To-dos.
  `);
};

module.exports = {
  printHelp,
};
