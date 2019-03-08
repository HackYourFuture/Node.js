'use strict';

const Express = require('express');
const app = new Express();

const { createTodo, readTodos, updateTodo, deleteTodo } = require('../../lecture/src/actions');
const markAsDone = require('./markAsDone');
const markAsNotDone = require('./markAsNotDone');
const readTodo = require('./readTodo');
const clearTodos = require('./clearTodos');

const Todo = require('./todos');

const FILENAME = 'todos.json';
const PORT = 3000;
const TODO_SLUG = 'todos';

const todo = new Todo(FILENAME);

app.use(Express.json());

app.post(`/${TODO_SLUG}`, createTodo.bind(null, todo));
app.get(`/${TODO_SLUG}`, readTodos.bind(null, todo));
app.put(`/${TODO_SLUG}/:id`, updateTodo.bind(null, todo));
app.delete(`/${TODO_SLUG}/:id`, deleteTodo.bind(null, todo));
app.get(`/${TODO_SLUG}/:id`, readTodo.bind(null, todo));
app.delete(`/${TODO_SLUG}/`, clearTodos.bind(null, todo));
app.post(`/${TODO_SLUG}/:id/:done`, markAsDone.bind(null, todo));
app.delete(`/${TODO_SLUG}/:id/:done`, markAsNotDone.bind(null, todo));

app.listen(PORT, error => {
  if (error) return console.error(error);

  console.log(`Server started on >> http://localhost:${PORT}`);
});
