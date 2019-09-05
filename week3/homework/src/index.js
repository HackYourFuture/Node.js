'use strict';

// TODO: Write the homework code in this file
const express = require('express');
const app = express();
const uuidv4 = require('uuid/v4');
const fs = require('fs');
const port = 3000;

app.use(express.json()); // parsee the request.body 

function readTodosFromFile() {
  return new Promise((resolve, reject) => {
    fs.readFile('./todos.json', 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  })
}

function parseAndValidateTodo(request) {
  const {
    todo
  } = request.body;
  if (todo == null) throw new Error('todo not set');

  if (todo.description != null) todo.description = todo.description.trim();

  if (todo.description == null || todo.description.length === 0) throw new Error('description not set');

  return todo;
}

function saveTodos(todos) {
  return new Promise((resolve, reject) => {
    fs.writeFile('./todos.json', JSON.stringify(todos), 'utf8', err => {
      if (err) {
        reject(err)
      } else {
        resolve()
      };
    });
  })
}

async function readTodos(req, res) {
  let todos = await readTodosFromFile();
  res.send(todos);
}
async function readTodo(req, res) {
  let todos = await readTodosFromFile();
  let todo = todos.find(todo => todo.id == req.params.id);
  res.send(todo);
}

async function createTodo(req, res) {
  let todo = parseAndValidateTodo(req);
  let todos = await readTodosFromFile();
  todo.id = uuidv4();
  todos.push(todo);
  await saveTodos(todos);
  res.status = 201;
  res.end();
}

async function markAsDone(req, res) {
  let todos = await readTodosFromFile();
  let targetTodo = todos.find(todo => todo.id == req.params.id);
  targetTodo.done = true;
  await saveTodos(todos);
  res.status = 201;
  res.end();
}

async function updateTodo(req, res) {
  let updateTodo = parseAndValidateTodo(req);
  let todos = await readTodosFromFile();
  let originalTodo = todos.find(todo => todo.id == req.params.id);
  originalTodo.description = updateTodo.description;
  await saveTodos(todos);
  res.status = 201;
  res.end();
}

async function deleteTodo(req, res) {
  let todos = await readTodosFromFile();
  let todo = todos.find(todo => todo.id == req.params.id);
  let indexToDelete = todos.indexOf(todo);
  todos.splice(indexToDelete, 1);
  await saveTodos(todos);
  res.status = 200;
  res.end();
}

async function clearTodos(req, res) {
  await saveTodos([]);
  res.status = 200;
  res.end();
}

async function markAsNotDone(req, res) {
  let todos = await readTodosFromFile();
  let targetTodo = todos.find(todo => todo.id == req.params.id);
  targetTodo.done = false;
  await saveTodos(todos);
  res.status = 200;
  res.end();
}

app.get('/todos', (req, res) => readTodos(req, res));
app.get('/todos/:id', (req, res) => readTodo(req, res));

app.post('/todos', (req, res) => createTodo(req, res));
app.post('/todos/:id/done', (req, res) => markAsDone(req, res));

app.put('/todos/:id', (req, res) => updateTodo(req, res));

app.delete('/todos/:id', (req, res) => deleteTodo(req, res));
app.delete('/todos/', (req, res) => clearTodos(req, res));
app.delete('/todos/:id/done', (req, res) => markAsNotDone(req, res));

app.listen(port, () => console.log(`todo app listening on port ${port}`));