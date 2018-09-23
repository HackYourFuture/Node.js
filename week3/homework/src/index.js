'use strict';

const Express = require('express');

// import our CRUD actions
const {
  createTodo,
  readTodos,
  updateTodo,
  deleteTodo
  , readSingalTodo,
  markAsDone,
  markAsNotDone,
  clearTodoList
} = require('./actions');

const Todo = require('./todo');

const FILENAME = 'todos.json';
const PORT = 4566;
const TODO_SLUG = 'todos';

const todo = new Todo(FILENAME);

const app = new Express();

// Use built-in JSON middleware to automatically parse JSON
app.use(Express.json());

app.post(`/${TODO_SLUG}`, createTodo.bind(null, todo));
app.get(`/${TODO_SLUG}`, readTodos.bind(null, todo));
app.put(`/${TODO_SLUG}/:id`, updateTodo.bind(null, todo));
app.delete(`/${TODO_SLUG}/:id`, deleteTodo.bind(null, todo));


app.get(`/${TODO_SLUG}/:id`, readSingalTodo.bind(null, todo));
app.put(`/${TODO_SLUG}/:id/done`, markAsDone.bind(null, todo));
app.put(`/${TODO_SLUG}/:id/notyet`, markAsNotDone.bind(null, todo));
app.delete(`/${TODO_SLUG}`, clearTodoList.bind(null, todo));

app.listen(PORT, error => {
  if (error)
    return console.error(error);

  console.log(`Server started on http://localhost:${PORT}`);
});
