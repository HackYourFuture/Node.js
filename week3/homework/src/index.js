'use strict';

{
  const Express = require('express');
  const { readTodo, clearTodos, markTodo } = require('./actions');
  const Todo = require('./todo');

  const FILENAME = 'todos.json';
  const PORT = 3000;
  const TODO_SLUG = 'todos';
  const DONE = true;
  const NOT_DONE = false;

  const todo = new Todo(FILENAME);
  const app = new Express();

  // Use built-in JSON middleware to automatically parse JSON
  app.use(Express.json());

  app.get(`/${TODO_SLUG}/:id`, readTodo.bind(null, todo));
  app.delete(`/${TODO_SLUG}`, clearTodos.bind(null, todo));
  app.post(`/${TODO_SLUG}/:id/done`, markTodo.bind(null, todo, DONE));
  app.delete(`/${TODO_SLUG}/:id/done`, markTodo.bind(null, todo, NOT_DONE));

  app.listen(PORT, error => {
    if (error) return console.error(error);

    console.log(`Server started on http://localhost:${PORT}`);
  });
}
