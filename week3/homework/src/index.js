'use strict';

const express = require('express');
const app = express();
const uuidv4 = require('uuid/v4');
const path = require('path');
const fs = require('fs');
const port = 3000;

app.use(express.json());
const toDosPath = path.join(__dirname, './todos.json');

async function readToDo(req, res) {
  const todos = await readTodosFromFile();
  if (req.params.id) {
    let todo = todos.find(todo => todo.id === req.params.id);
    res.send(todo);
  } else {
    res.send(todos);
  }
}

function readTodosFromFile() {
  return new Promise((resolve, reject) => {
    fs.readFile(toDosPath, 'utf8', (err, data) => {
      if (err) reject(err);
      else resolve(JSON.parse(data));
    });
  });
}

function saveTodos(todos) {
  return new Promise((resolve, reject) => {
    fs.writeFile(toDosPath, JSON.stringify(todos), 'utf8', err => {
      if (err) reject(err);
      else resolve();
    });
  });
}

function validateTodo(req) {
  const { todo } = req.body;
  if (todo === null) {
    throw new Error('Todo no set');
  }
  if (todo.description != null) {
    todo.description = todo.description.trim();
  }
  if (todo.description === null || todo.description.length === 0) {
    throw new Error('Description not set');
  }
  return todo;
}

async function createTodo(req, res) {
  let todo = validateTodo(req);
  let todos = await readTodosFromFile();
  todo.id = uuidv4();
  todo.done = false;
  todos.push(todo);
  await saveTodos(todos);
  res.status = 201;
  res.end();
}

async function updateTodo(req, res) {
  let updateTodo = validateTodo(req);
  let todos = await readTodosFromFile();
  let originalTodo = todos.find(todo => todo.id === req.params.id);
  originalTodo.description = updateTodo.description;
  await saveTodos(todos);
  res.status = 201;
  res.end();
}

async function deleteTodo(req, res) {
  let todos = await readTodosFromFile();
  if (req.params.id) {
    let todo = todos.find(todo => todo.id === req.params.id);
    let indexToDelete = todos.indexOf(todo);
    todos.splice(indexToDelete, 1);
  } else {
    todos = [];
  }
  await saveTodos(todos);
  res.status = 200;
  res.end();
}

async function markToDo(req, res) {
  const todos = await readTodosFromFile();
  let todo = todos.find(todo => todo.id === req.params.id);
  todo.done === false ? (todo.done = true) : (todo.done = false);
  await saveTodos(todos);
  res.status = 201;
  res.end();
}

app.get('/todos', (req, res) => readToDo(req, res));
app.post('/todos', (req, res) => createTodo(req, res));
app.put('/todos/:id', (req, res) => updateTodo(req, res));
app.delete('/todos/:id', (req, res) => deleteTodo(req, res));

app.get('/todos/:id', (req, res) => readToDo(req, res));
app.post('/todos/:id/done', (req, res) => markToDo(req, res));
app.delete('/todos', (req, res) => deleteTodo(req, res));
app.delete('/todos/:id/done', (req, res) => markToDo(req, res));

app.listen(port, () => console.log(`Server is listening up on ${port}`));
