'use strict';

const Express = require('express');
const app = new Express();

const {
  createTodo,
  updateTodo,
  deleteTodo,
  readTodo,
  clearTodos,
  markAsDone,
} = require('./actions');

const Todo = require('./todo');

const FILENAME = 'todos.json';
const PORT = 3000;
const TODO_SLUG = 'todos';

const todo = new Todo(FILENAME);
app.use(Express.json());

app.post(`/${TODO_SLUG}`, createTodo.bind(null, todo));
app.get(`/${TODO_SLUG}/:id`, readTodo.bind(null, todo)); //
app.put(`/${TODO_SLUG}/:id`, updateTodo.bind(null, todo));
app.delete(`/${TODO_SLUG}/:id`, deleteTodo.bind(null, todo));
app.delete(`/${TODO_SLUG}`, clearTodos.bind(null, todo));
app.post(`/${TODO_SLUG}/:id/done`, markAsDone.bind(null, todo));
app.delete(`/${TODO_SLUG}/:id/done`, markAsDone.bind(null, todo));

app.listen(PORT, error => {
  if (error) return console.error(error);

  console.log(`Server started on http://localhost:${PORT}`);
});
