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
app.post('/todos/:id/done', markAsDone);
app.delete('/todos/:id/done', markAsNotDone);
app.delete('/todos/:id/remove', remove);
app.put('/todos/:id/:newText', update);

app.listen(3000);
