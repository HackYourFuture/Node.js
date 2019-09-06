'use strict';

const Express = require('express');

// import our CRUD actions
const {
  createTodo,
  readTodos,
  updateTodo,
  deleteTodo,

  // under this line: homework assignment 4 more actions
  clearTodos,
  readTodo,
  markAsDone,
  markAsNotDone,
} = require('./actions');

const Todo = require('./todo');

const FILENAME = 'todos.json';
const PORT = 3000;
const TODO_SLUG = 'todos';

const todo = new Todo(FILENAME);

const app = new Express();

// Use built-in JSON middleware to automatically parse JSON
app.use(Express.json());

// actions from lecture
app.post(`/${TODO_SLUG}`, createTodo.bind(null, todo));
app.get(`/${TODO_SLUG}`, readTodos.bind(null, todo));
app.put(`/${TODO_SLUG}/:id`, updateTodo.bind(null, todo));
app.delete(`/${TODO_SLUG}/:id`, deleteTodo.bind(null, todo));

// homework assignment 4 more actions
app.get(`/${TODO_SLUG}/:id`, readTodo.bind(null, todo));
app.post(`/${TODO_SLUG}/:id/done`, markAsDone.bind(null, todo));
app.delete(`/${TODO_SLUG}/:id/done`, markAsNotDone.bind(null, todo));
app.delete(`/${TODO_SLUG}`, clearTodos.bind(null, todo));

app.listen(PORT, error => {
  if (error) return console.error(error);

  console.log(`Server started on http://localhost:${PORT}`);
});
