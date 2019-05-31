'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const { readTodo, clearTodos, markAsDone, markAsNotDone } = require('./actions');

const Todo = require('./todo');
const FILENAME = `${__dirname}/todoList.json`;
const todo = new Todo(FILENAME);

app.use(bodyParser.json());

const TODO_SLUG = 'todos';
// Get a single to-do with ID :id
app.get(`/${TODO_SLUG}/:id`, readTodo.bind(null, todo));

// Clear the list of to-dos
app.delete(`/${TODO_SLUG}`, clearTodos.bind(null, todo));

// Set the done flag of a single to-do to true
app.post(`/${TODO_SLUG}/:id/done`, markAsDone.bind(null, todo));

// Set the done flag of a single to-do to false
app.delete(`/${TODO_SLUG}/:id/done`, markAsNotDone.bind(null, todo));

const PORT = 4000;
app.listen(PORT, error => {
  if (error) return console.error(error);
  console.log(`Server started on http://localhost:${PORT}`);
});
