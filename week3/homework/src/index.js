'use strict';

const express = require('express');
const app = express();

const add = require('./actions/add.js');
const readAndParseTodos = require('./actions/readAndparse');
const list = require('./actions/list');
const removeOne = require('./actions/removeOne');
const removeAll = require('./actions/removeAll');
const update = require('./actions/update');
const todoDone = require('./actions/TodoDone');

const parsedTodos = readAndParseTodos();

app.use(express.json());

// POST
app.post('/todos', (req, res) => {
  const addedTodo = add(req.body.todo, req, res);
  if (addedTodo) res.status(201).send(addedTodo);
});

//GET all todos
app.get('/todos', (_req, res) => {
  const TodosList = list(_req, res);

  res.send(TodosList);
});

// GET a todo by id
app.get('/todos/:id', (req, res) => {
  const todo = parsedTodos.find(td => td.id === req.params.id);
  if (!todo) res.status(404).send(`${res.statusCode} :the todo with the id: ${req.params.id} was not found`);
  res.send(todo);
});

//Delete all Todos items

app.delete('/todos', (_req, res) => {
  removeAll();
  res.send(`${res.statusCode} : All the todos are deleted`);
});

//Delete by id
app.delete('/todos/:id', (req, res) => {
  removeOne(req, res);
  res.status(204).send();
});

//PUT -update

app.put('/todos/:id', (req, res) => {
  const todoUpdated = update(req.body.todo, req.body.done, req, res);
  if (todoUpdated) {
    res.status(201).send(todoUpdated);
  } else {
    return res.status(404).send(`${res.statusCode} :the todo with the id: ${req.params.id} was not found`);
  }
});

//POST /todos/:id/done - Marks a todo as done

app.post('/todos/:id/done', (req, res) => {

  todoDone(true, 'done', req, res);
});

//DELETE /todos/:id/done - Unmarks a todo as done

app.delete('/todos/:id/done', (req, res) => {
  todoDone(false, 'undone', req, res);
});

const port = 4000;
app.listen(port, () => {
  console.log(`listening to the port : ${port} ...`);
});