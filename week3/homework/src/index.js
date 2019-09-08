'use strict';
const fs = require('fs');
const express = require('express')
const app = express()
const uuidv4 = require('uuid/v4');

const port = 3000

// use built-in JSON middleware to automatically parse JSON
app.use(express.json());

function readTodosFromFile() {
  return new Promise((resolve, reject) => {
    fs.readFile('todo.json', 'utf8', (err, data) => {
      if (err) reject(err);
      else resolve(JSON.parse(data));
    });
  });
}

function saveTodos(todos) {
  return new Promise((resolve, reject) => {
    fs.writeFile('todo.json', JSON.stringify(todos), 'utf8', err => {
      if (err) reject(err);
      else resolve();
    });

  });
}

function parseAndValidateTodo(request) {
  console.log(request.body);
  
  const { todo } = request.body;
  if(todo == null)
  throw new Error('todo not set');

  if(todo.description != null)
  todo.description = todo.description.trim();

  if(todo.description == null || todo.description.length === 0)
  throw new Error('description not set')

  return todo;
}

async function readTodos(req, res) {
  let todos = await readTodosFromFile();
  res.send(todos);
}

async function createTodo(req, res) {
  let todo = parseAndValidateTodo(req);
  let todos = await readTodosFromFile();
  todo.id = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
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

//[{id: "fgfG", description: "todo1"}, {id: "fgfffG", description: "todo2"}]
async function deleteTodo(req, res) {
  let todos = await readTodosFromFile(); 
  let todo = todos.find(todo => todo.id == req.params.id);
  let indexToDelete = todos.indexOf(todo);
  todos.splice(indexToDelete, 1);
  await saveTodos(todos);
  res.status = 200;
  res.end();
}

async function readTodo(req, res) {
  let todos = await readTodosFromFile();
  let todo = todos.find(todo => todo.id == req.params.id);
  // console.log(todo);
  res.send(todo);
}

async function markAsDone(req, res) {
  const todos = await readTodosFromFile();
  const todo = todos.find(todo => todo.id == req.params.id);
  todo.isDone = true;
  await saveTodos(todos);
  res.status = 201;
  res.end();
}

async function markAsNotDone(req, res) {
  const todos = await readTodosFromFile();
  const todo = todos.find(todo => todo.id == req.params.id);
  // console.log(todo);
  todo.isDone = false;
  await saveTodos(todos);
  res.status = 201;
  res.end();
}

async function clearTodos(req, res) {
  await saveTodos([]);
  res.status = 200;
  res.end();
}

app.get('/todos', (req, res) => readTodos(req, res));
app.post('/todos', (req, res) => createTodo(req, res));
app.put('/todos/:id', (req, res) => updateTodo(req, res));
app.delete('/todos/:id', (req, res) => deleteTodo(req, res));

// homework

app.get('/todos/:id', (req, res) => readTodo(req, res));
app.delete('/todos', (req, res) => clearTodos(req, res));
app.post('/todos/:id/done', (req, res) => markAsDone(req, res));
app.delete('/todos/:id/done', (req, res) => markAsNotDone(req, res));


app.listen(port, () => console.log(`Example app listening on port ${port}!`))




