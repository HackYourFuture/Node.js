'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const {
  add,
  readTodo,
  remove,
  markAsNotDone,
  markAsDone,
  clearTodos,
  update,
} = require('./actions');

const app = express();
app.use(bodyParser.json());

app.get('/todos/:id', readTodo);
app.delete('/todos', clearTodos);
app.post('/todos/add/:text', add);
app.put('/todos/done/:id', markAsDone);
app.put('/todos/notDone/:id', markAsNotDone);
app.delete('/todos/:id/remove', remove);
app.put('/todos/:id/:newText', update);

app.listen(3000);
