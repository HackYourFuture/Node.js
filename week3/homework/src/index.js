'use strict';
const express = require('express');
const uuid = require('uuid/v4');

const { readFile: _readFile, writeFile: _writeFile } = require('fs');
const { promisify } = require('util');

const readFile = promisify(_readFile);
const writeFile = promisify(_writeFile);

const app = express();
//build-in json middleware to automatically parse json
app.use(express.json());
const TODO_FILE = 'todos.json';

function readTodos() {
  return readFile(TODO_FILE, `utf8`).then(
    JSON.parse,
    () => ({})
  );
}

function writeTodos(data) {
  return writeFile(TODO_FILE, JSON.stringify(data));
}

//Create a todo
app.post('/todos', async (req, res) => {
  const newTodo = req.body;
  const id = uuid();
  newTodo.done = false;
  const todos = await readTodos();
  todos[id] = newTodo;
  await writeTodos(todos);
  res.json(todos);
});

//Read all todos
app.get('/todos', async (req, res) => {
  const todos = await readTodos();
  res.json(todos);
});

//Read a todo by ID
app.get('/todos/:id', async (req, res) => {
  const id = req.params.id;
  const todos = await readTodos();
  res.json(todos[id]);
});

//Delete all todos
app.delete('/todos', async (req, res) => {
  await writeTodos({});
  res.json({});
});

//Delete a todo by ID
app.delete('/todos/:id', async (req, res) => {
  const id = req.params.id;
  const todos = await readTodos();
  delete todos[id];
  await writeTodos(todos);
  res.json(todos);
});

//update a todo
app.put('/todos/:id', async (req, res) => {
  const id = req.params.id;
  const newTodo = req.body;
  const todos = await readTodos();
  todos[id].description = newTodo.description;
  await writeTodos(todos);
  res.json(todos);
});

//Mark a todo as done
app.post('/todos/:id/done', async (req, res) => {
  const id = req.params.id;
  const todos = await readTodos();
  todos[id].done = true;
  await writeTodos(todos);
  res.json(todos);
});

//Mark a todo as not done
app.delete('/todos/:id/done', async (req, res) => {
  const id = req.params.id;
  const todos = await readTodos();
  todos[id].done = false;
  await writeTodos(todos);
  res.json(todos);
});

app.listen(3000, () => {
  console.info(`listening on http://localhost:3000`);
});
