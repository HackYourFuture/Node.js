console.log('Starting todos.js');

const fs = require('fs');

// add a todo item //
let addTodo = title => {
  let todos = fetchTodos();
  let todo = {
    title,
  };

  let duplicatetodos = todos.filter(todo => todo.title === title);

  if (duplicatetodos.length === 0) {
    todos.push(todo);
    saveTodos(todos);
    return todo;
  }
};

// delete a todo item //
let deleteTodo = title => {
  let todos = fetchTodos();
  let filteredtodos = todos.filter(todo => todo.title !== title);
  saveTodos(filteredtodos);

  return todos.length !== filteredtodos.length;
};

//reset
let reset = () => {
  // return fetchTodos(null);
  fs.writeFileSync('todos-data.json', JSON.stringify([]));
};

// list all todo items //
let listTodos = () => {
  return fetchTodos();
};

// utility functions
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

// exported functions
module.exports = {
  addTodo,
  deleteTodo,
  listTodos,
  logTodo,
  reset,
};
