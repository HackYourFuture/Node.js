'use strict';

const Express = require('express');
const app = new Express();

const {
  createTodo,
  readTodos,
  updateTodo,
  deleteTodo,
  readTodo,
  deleteTodos,
  markAsDone,
  markAsNotDone,
} = require('./actions/index.js');

const Todo = require('./todo');

const FILENAME = './todos.json';
const todo = new Todo(FILENAME);

app.use(Express.json());

const TODO_SLUG = 'todos';
app.post(`/${TODO_SLUG}`, createTodo.bind(null, todo));
app.get(`/${TODO_SLUG}`, readTodos.bind(null, todo));
app.put(`/${TODO_SLUG}/:id`, updateTodo.bind(null, todo));
app.delete(`/${TODO_SLUG}/:id`, deleteTodo.bind(null, todo));

app.get(`/${TODO_SLUG}/:id`, readTodo.bind(null, todo));
app.delete(`/${TODO_SLUG}`, deleteTodos.bind(null, todo));
app.post(`/${TODO_SLUG}/:id/done`, markAsDone.bind(null, todo));
app.delete(`/${TODO_SLUG}/:id/done`, markAsNotDone.bind(null, todo));

const PORT = 3000;
app.listen(PORT, error => {
  if (error) return console.error(error);
  console.log(`Server started on http://localhost:${PORT}`);
});
