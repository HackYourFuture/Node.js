'use strict';

const express = require('express');
const uuidv4 = require('uuid/v4');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.json()); // every request comes in it will first parse through what you have here >>
// middlewares that come from express it take body as string parse it and put back into the body it happen before request

async function readTodosFromFile() {
  return new Promise((resolve, reject) => {
    fs.readFile('todos.json', 'utf8', (err, data) => {
      if (err) reject(err);
      else resolve(JSON.parse(data));
    });
  });
}

function saveTodos(todos) {
  return new Promise((resolve, reject) => {
    fs.writeFile('todos.json', JSON.stringify(todos), 'utf8', err => {
      if (err) reject(err);
      else resolve();
    });
  });
}

function parseAndValidateTodo(request) {
  const { todo } = request.body; // body is a string and we need to go to a json object
  // we could here also put JSON.parse and also if we know every request comes will be json express gives us nicer way by => app.use(express.json()
  if (todo == null) throw new Error('todo not set');
  if (todo.description != null) todo.description = todo.description.trim();
  if (todo.description == null || todo.description.length === 0)
    throw new Error('Description not set');
  return todo;
}

async function readTodos(req, res) {
  let todos = await readTodosFromFile();
  res.send(todos);
}
async function readTodo(req, res) {
  let todos = await readTodosFromFile();
  let todo = todos.find(todo => todo.id === req.params.id);
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

async function updateTodo(req, res) {
  let updateTodo = parseAndValidateTodo(req);
  let todos = await readTodosFromFile();
  let originalTodo = todos.find(todo => todo.id === req.params.id);
  originalTodo.description = updateTodo.description;
  await saveTodos(todos);
  res.status = 200;
  res.end();
}
async function markAsDone(req, res) {
  let todos = await readTodosFromFile();
  let todo = todos.find(todo => todo.id === req.params.id);
  todo.done = true;
  await saveTodos(todos);
  res.status = 201;
  res.end();
}

async function markAsNotDone(req, res) {
  let todos = await readTodosFromFile();
  let todo = todos.find(todo => todo.id === req.params.id);
  todo.done = false;
  await saveTodos(todos);
  res.status = 200;
  res.end();
}

// array of object  [{id: "asd", description: "todo1"}, {id: "yxc",description: "todo2"}]
// id in the url and description in the body
// there is nothing to parse
async function deleteTodo(req, res) {
  let todos = await readTodosFromFile();
  let todo = todos.find(todo => todo.id === req.params.id);
  let indexToDelete = todos.indexOf(todo);
  todos.splice(indexToDelete, 1);
  todo.push(todo);
  await saveTodos(todos);
  res.status = 200;
  res.end();
}
async function clearTodos(req, res) {
  let todos = await readTodosFromFile();
  todos = [];
  await saveTodos(todos);
  res.status = 200;
  res.end();
}

// this is methods
app.get('/todos', (req, res) => readTodos(req, res));
app.get('/todos/:id', (req, res) => readTodo(req, res));
app.post('/todos', (req, res) => createTodo(req, res));
app.put('/todos/:id', (req, res) => updateTodo(req, res)); // it change everything and everything for user is description that stored in the todo
app.put('/todos/:id/done', (req, res) => markAsDone(req, res));
app.delete('/todos/:id/done', (req, res) => markAsNotDone(req, res));
app.delete('/todos/:id', (req, res) => deleteTodo(req, res));
app.delete('/todos', (req, res) => clearTodos(req, res));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
