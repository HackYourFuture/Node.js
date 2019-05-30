'use strict';

const express = require('express');

const app = express();
const bodyParser = require('body-parser');

const { readTodo } = require('./actions/readTodo');
const { clearTodos } = require('./actions/clearTodos');
const { markAsDone } = require('./actions/markAsDone');
const { markAsNotDone } = require('./actions/markAsNotDone');

// const { readTodo, clearTodos, markAsDone, markAsNotDone } = require('./actions');

app.use(bodyParser.json());

// readTodo (GET /todos/:id) => Get a single to-do with ID :id
app.get('/todos/:id', readTodo);

// clearTodos (DELETE /todos) => Clear the list of to-dos
app.delete('/todos', clearTodos);

// markAsDone (POST /todos/:id/done) => Set the done flag of a single to-do to true
app.post('/todos/:id/done', markAsDone);

// markAsNotDone (DELETE /todos/:id/done) => Set the done flag of a single to-do to false
app.delete('/todos/:id/done', markAsNotDone);

const PORT = 4000;
app.listen(PORT, error => {
  if (error) return console.error(error);
  console.log(`Server started on http://localhost:${PORT}`);
});
