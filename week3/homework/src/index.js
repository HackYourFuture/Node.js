'use strict';

const express = require('express');
const app = express();
const fs = require('fs');
const uuidv4 = require('uuid/v4');
const port = 3041;
// const todos = require('./todos.json');

app.use(express.json());

function readTodoFiles() {
  return new Promise(function(resolve, reject) {
    fs.readFile('todos.json', 'utf8', (err, data) => {
      if (err) reject(err);
      else resolve(JSON.parse(data));
    });
  });
}

function saveTodos(savePath) {
  return new Promise(function(resolve, reject) {
    fs.writeFile('todos.json', JSON.stringify(savePath), 'utf8', err => {
      if (err) reject(err);
      else resolve();
    });
  });
}

async function readTodos(req, res) {
  const data = await readTodoFiles();
  if (data.length === 0) {
    res.send('Item not found. Please add some items.');
  } else {
    res.send(data);
  }
}

async function deleteTodo(req, res) {
  const todos = await readTodoFiles();
  const todo = todos.find(todo => todo.id == req.params.id);
  const indexOfTodo = todos.indexOf(todo);
  todos.splice(indexOfTodo, 1);
  todos.push(todo);
  await saveTodos(todo);
  res.status = 201;
  res.send();
}

async function createTodo(req, res) {
  const todo = validateAndParseTodo(req);
  const todos = await readTodoFiles();
  todo.id = uuidv4();
  todo.done = false;
  todos.push(todo);
  await saveTodos(todos);
  res.status = 201;
  res.send();
}

async function updateTodo(req, res) {
  try {
    const updateTodo = validateAndParseTodo(req);
    const todos = await readTodoFiles();
    const originalTodo = todos.find(todo => todo.id === req.params.id);
    originalTodo.description = updateTodo.description;
    await saveTodos(todos);
    res.send();
  } catch (err) {
    console.log(err.message);
  }
}

function validateAndParseTodo(req) {
  const { todo } = req.body;
  if (todo == null) console.log('todo not set');

  if (todo.description != null) todo.description = todo.description.trim();

  if (todo.description == null || todo.description.length === 0) console.log('description not set');
  return todo;
}

async function markAsDone(req, res) {
  try {
    const todos = await readTodoFiles();
    const targetedTodo = todos.find(todo => todo.id === req.params.id);
    targetedTodo.done = true;
    await saveTodos(todos);
    res.end('this task is done');
  } catch (err) {
    console.log(err.message);
  }
}

async function markAsNotDone(req, res) {
  const todos = await readTodoFiles();
  const todo = todos.find(todo => todo.id === req.params.id);
  todo.done = false;
  await saveTodos(todos);
  res.end('this task is not done');
}

async function readSpecificTodo(req, res) {
  const todos = await readTodoFiles();
  const task = todos.find(todo => todo.id === req.params.id);
  res.send(task);
}

async function deleteAllTodos(req, res) {
  let allData = await readTodoFiles();
  allData = [];
  await saveTodos(allData);
  res.status = 201;
  res.send('All todos are successfully deleted');
}

app.get('/', (req, res) => {
  res.send('Yo people!');
});

app.get('/todos', (req, res) => {
  readTodos(req, res);
});

app.get('/todos/:id', (req, res) => {
  readSpecificTodo(req, res);
});

app.post('/todos', (req, res) => {
  createTodo(req, res);
});

app.post('/todos/:id/done', (req, res) => {
  markAsDone(req, res);
});

app.put('/todo/:id', (req, res) => {
  updateTodo(req, res);
});

app.delete('/todo/:id', (req, res) => {
  deleteTodo(req, res);
});

app.delete('/todos', (req, res) => {
  deleteAllTodos(req, res);
});

app.delete('/todos/:id/done', (req, res) => {
  markAsNotDone(req, res);
});

app.listen(port, () => console.log(`You are listening to port ${port}`));
