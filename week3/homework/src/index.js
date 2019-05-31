const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const {
  addToDo,
  listToDo,
  readToDo,
  removeToDo,
  clearToDos,
  markAsDone,
  markAsNotDone,
  updateToDo,
} = require('./methodList.js');

const todoList = './todos.json';

const app = express();

app.use(bodyParser.json());

app.get('/', (request, response) => {
  listToDo(todoList, response);
});

app.get('/todos/:id', (request, response) => {
  readToDo(request.params.id, todoList, response);
});

app.post('/todo', (request, response) => {
  addToDo(request.body, todoList, response);
});

app.post('/todos/:id/done', (request, response) => {
  markAsDone(request.params.id, todoList, response);
});

app.delete('/todos/:id/done', (request, response) => {
  markAsNotDone(request.params.id, request.body, todoList, response);
});

app.delete('/todos/:id', (request, response) => {
  removeToDo(request.params.id, todoList, response);
});

app.delete('/todos', (request, response) => {
  clearToDos(todoList, response);
});

app.put('/todos/:id', (request, response) => {
  updateToDo(request.params.id, request.body, todoList, response);
});

app.listen(3000);
