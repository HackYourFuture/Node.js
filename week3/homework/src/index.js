// 'use strict';

const express = require('express');
const app = express();
const validateTodos = require('./validateTodos');
const todo = require('./todo.json');
app.use(express.json());

// get the list of todo
app.get('/todo', (req, res) => {
  res.send(todo);
});

// get todo by id number
app.get('/todo/:id', (req, res) => {
  const todoItem = todo.find(i => i.id === parseInt(req.params.id));
  if (!todoItem) return res.status(404).send('Id not found');
  res.send(todoItem);
});

// add todo
app.post('/todo', (req, res) => {
  const { error } = validateTodos(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const todoItem = {
    id: todo.length + 1,
    name: req.body.description,
    done: false,
  };
  todo.push(todoItem);
  res.send(todo);
});

// modify todo
app.put('/todo/:id', (req, res) => {
  const todoItem = todo.find(i => i.id === parseInt(req.params.id));
  if (!todoItem) return res.status(404).send('Id not found');

  const { error } = validateTodos(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  todoItem.description = req.body.description;
  res.send(todo);
});

// mark to do as done
app.delete('/todo/:id/true', (req, res) => {
  const todoItem = todo.find(c => c.id === parseInt(req.params.id));
  if (!todoItem) return res.status(404).send('Id not found');

  const { error } = validateTodos(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  todoItem.done = true;
  res.send(todoItem);
});

// mark todo as not done
app.delete('/todo/:id/false', (req, res) => {
  const todoItem = todo.find(i => i.id === parseInt(req.params.id));
  if (!todoItem) return res.status(404).send('Id not found');

  const { error } = validateTodos(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  todoItem.done = false;
  res.send(todoItem);
});

// delete todo by id number
app.delete('/todo/:id', (req, res) => {
  const todoItem = todo.find(i => i.id === parseInt(req.params.id));
  if (!todoItem) return res.status(404).send(`The given ID is not found`);

  const index = todo.indexOf(todoItem);
  todo.splice(index, 1);
  res.send(todo);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
