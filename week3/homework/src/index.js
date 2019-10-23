'use strict';

const Express = require('express');
const app = new Express();
app.use(Express.json());

const { readTodo, readTodos, clearTodos, markAsDone } = require('./actions');

const Todo = require('./todo');

const FILENAME = `${__dirname}/todolist.json`;
const PORT = 3000;
const todo = new Todo(FILENAME);
const TODO_SLUG = 'todos';

//keeping this here from the lecture for convenience :3
app.get(`/${TODO_SLUG}`, readTodos.bind(null, todo));
//reads a single todo item
app.get(`/${TODO_SLUG}/:id`, readTodo.bind(null, todo));
//DESTROYS EVERYTHING :(
app.delete(`/${TODO_SLUG}`, clearTodos.bind(null, todo));
//implementing this as a toggle since the assignment also wants the code to be DRY
app.put(`/${TODO_SLUG}/:id/toggle-done`, markAsDone.bind(null, todo));

app.listen(PORT, error => {
  if (error) return console.error(error);

  console.log(`Server started on http://localhost:${PORT}`);
});
