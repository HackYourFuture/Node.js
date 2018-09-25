'use strict';

const Express = require('express');
const app = new Express();
//  Controller
const {
  createTodo,
  readTodos,
  updateTodo,
  deleteTodo,
  readTodo,
  clearTodos,
  markAsDone,
  markAsNotDone
} = require('./controllers/crud');
//  Model
const Todo = require('./models/todo');
//  Database
const FILENAME = './db/todos.json';
const todo = new Todo(FILENAME);
//  Parser
app.use(Express.json());
//  Router
const TODO_SLUG = 'todos';
app.post(`/${TODO_SLUG}`, createTodo.bind(null, todo));
app.get(`/${TODO_SLUG}`, readTodos.bind(null, todo));
app.put(`/${TODO_SLUG}/:id`, updateTodo.bind(null, todo));
app.delete(`/${TODO_SLUG}/:id`, deleteTodo.bind(null, todo));
app.get(`/${TODO_SLUG}/:id`, readTodo.bind(null, todo));
app.delete(`/${TODO_SLUG}`, clearTodos.bind(null, todo));
app.post(`/${TODO_SLUG}/:id/done`, markAsDone.bind(null, todo));
app.delete(`/${TODO_SLUG}/:id/done`, markAsNotDone.bind(null, todo));
//  Server
const PORT = 3000;
app.listen(PORT, error => {
  if (error) return console.error(error);
  console.log(`Server started on http://localhost:${PORT}`);
});
