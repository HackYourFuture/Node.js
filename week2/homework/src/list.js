'use strict';

const fs = require('fs');

// List The To-dos
let listTodos = () => {
  return fetchTodos();
};

// Utility functions
let fetchTodos = () => {
  try {
    let todosString = fs.readFileSync('todos-data.json');
    return JSON.parse(todosString);
  } catch (e) {
    return [];
  }
};

let saveTodos = todos => {
  fs.writeFileSync('todos-data.json', JSON.stringify(todos));
};

let logTodo = todo => {
  console.log('------');
  console.log(`It's title is: ${todo.title}`);
};

module.exports = {
  listTodos,
  logTodo,
};
