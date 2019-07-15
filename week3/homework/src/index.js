'use strict';

const express = require('express');
const { listTodos, addTodo } = require('./actions');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/todos', (req, res) => {
  const todos = listTodos();
  res.send(todos);
});

app.post('/todos', (req, res) => {
  const todo = req.body;
  addTodo(todo);
  res.send('Okay');
});
app.listen(PORT);
