'use strict';

const express = require('express');
const app = express();
const {
  createTodo,
  updateTodo,
  readTodos,
  deleteTodo,
  readTodo,
  clearTodos,
  markAsDone,
  markAsNotDone
} = require('./actions');

// app.post('/todos', (req, res) {
//   createTodo();
// })
app.post('/todos', (req, res) => {
  createTodo(req, res);
});

app.get('/todos', (req, res) => {
  readTodos(req, res)
    .then(todos => res.status(200).json(todos))
    .catch(error => res.status(500).send("can't read file!", error));
});

app.put('/todos/:id', (req, res) => {
  updateTodo();
});

app.delete('/todos/:id', (req, res) => {
  deleteTodo();
});

app.get('/todos/:id', (req, res) => {
  readTodo();
});

app.post('/todos/:id/done', (req, res) => {
  clearTodos();
});

app.put('/todos', (req, res) => {
  markAsDone();
});
app.delete('/todos/:id/done', (req, res) => {
  markAsNotDone();
});
