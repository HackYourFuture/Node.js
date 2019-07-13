'use strict';

const fs = require('fs');

// Removes Todo
let deleteTodo = title => {
  let todos = fetchTodos();
  let filteredtodos = todos.filter(todo => todo.title !== title);
  saveTodos(filteredtodos);

  return todos.length !== filteredtodos.length;
};

// Utility Functions
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

module.exports = {
  deleteTodo,
};
