// 'use strict';

const express = require('express');
const Joi = require('joi');
const app = express();
const todos = require('./todos');
app.use(express.json());

// get the list of todos
app.get('/todos', (req, res) => {
  res.send(todos);
});

// get todo by id number
app.get('/todos/:id', (req, res) => {
  const todo = todos.find(c => c.id === parseInt(req.params.id));
  if (!todo) return res.status(404).send('the given api not found');
  res.send(todo);
});

// add todo
app.post('/todos', (req, res) => {
  const { error } = validateTodos(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const todo = {
    id: todos.length + 1,
    name: req.body.name,
    done: false,
  };
  todos.push(todo);
  res.send(todos);
});

// modify todo
app.put('/todos/:id', (req, res) => {
  const todo = todos.find(c => c.id === parseInt(req.params.id));
  if (!todo) return res.status(404).send('the given api not found');

  const { error } = validateTodos(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  todo.name = req.body.name;
  res.send(todos);
});

// mark to do as done
app.delete('/todos/:id/true', (req, res) => {
  const todo = todos.find(c => c.id === parseInt(req.params.id));
  if (!todo) return res.status(404).send('the given api not found');

  const { error } = validateTodos(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  todo.done = true;
  res.send(todo);
});

// mark todo as not done
app.delete('/todos/:id/false', (req, res) => {
  const todo = todos.find(c => c.id === parseInt(req.params.id));
  if (!todo) return res.status(404).send('the given api not found');

  const { error } = validateTodos(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  todo.done = false;
  res.send(todo);
});

// delete todo by id number
app.delete('/todos/:id', (req, res) => {
  const todo = todos.find(c => c.id === parseInt(req.params.id));
  if (!todo) return res.status(404).send('the given api not found');

  const index = todos.indexOf(todo);
  todos.splice(index, 1);
  res.send(todo);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
