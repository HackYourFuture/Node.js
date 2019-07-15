'use strict';

const fs = require('fs');

// Adds a To-do
var addTodo = title => {
  var todos = [];
  var todo = {
    title,
  };

  try {
    var todosString = fs.readFileSync('todos-data.json');
    todos = JSON.parse(todosString);
  } catch (e) {}

  var duplicatetodos = todos.filter(todo => todo.title === title);

  if (duplicatetodos.length === 0) {
    todos.push(todo);
    fs.writeFileSync('todos-data.json', JSON.stringify(todos));
  }
};

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
  addTodo,
};
