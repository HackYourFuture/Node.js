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

module.exports = {
  addTodo,
};
