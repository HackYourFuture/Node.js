const express = require('express');
const app = express();
const uuid = require('uuid');
const fs = require('fs');
const port = 3000;
app.use(express.json());

function readTodosFromFile() {
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
function parseAndValidateTodo(req) {
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
async function readTodos(req, res) {
  let todos = await readTodosFromFile();
  res.send(todos);
}

async function createTodo(req, res) {
  let todo = parseAndValidateTodo(req);
  let todos = await readTodosFromFile();
  todo.id = uuid();
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
  res.status = 201;
  res.end();
}
async function deleteTodo(req, res) {
  let todos = await readTodosFromFile();
  let todo = todos.find(todo => todo.id === req.params.id);
  let indexToDelete = todos.indexOf(todo);
  todos.splice(indexToDelete, 1);
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
async function readTodo(req, res) {
  let todos = await readTodosFromFile();
  let todo = todos.find(todo => todo.id === req.params.id);
  res.send(todo);
}
async function markAsDone(req, res) {
  let todos = await readTodosFromFile();
  let todo = todos.find(todo => todo.id === req.params.id);
  todo.isDone = true;
  await saveTodos(todos);
  res.status = 201;
  res.end();
}
async function markAsNotDone(req, res) {
  let todos = await readTodosFromFile();
  let todo = todos.find(todo => todo.id === req.params.id);
  todo.isDone = false;
  await saveTodos(todos);
  res.status = 200;
  res.end();
}
app.get('/todos', (req, res) => readTodos(req, res));
app.post('/todos', (req, res) => createTodo(req, res));
app.put('/todos/:id', (req, res) => updateTodo(req, res));
app.delete('/todos/:id', (req, res) => deleteTodo(req, res));

app.get('/todos/:id', (req, res) => readTodo(req, res));
app.delete('/todos', (req, res) => clearTodos(req, res));
app.post('/todos/:id/done', (req, res) => markAsDone(req, res));
app.delete('/todos/:id/done', (req, res) => markAsNotDone(req, res));

app.listen(port, () => console.log(`Server is listening up on ${port}`));
