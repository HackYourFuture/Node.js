'use strict';

const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const uuidv4 = require('uuid/v4');
const file = fs.readFileSync('./toDos.json', 'utf8');
let list = JSON.parse(file);
const app = express();
function writeFile() {
  fs.writeFileSync('./toDos.json', JSON.stringify(list, null, 2), (err) => {
    if (err) throw err;
  });
}

app.use(bodyParser());

app.post('/todos', (req, res) => {
  let newTask = req.body;
  newTask.todo.id = uuidv4();
  newTask.todo.done = false;
  list.push(newTask.todo);
  writeFile(list);
  res.send('new task created successfully');
});

app.get('/todos', (req, res) => {
  res.send(list);
});

app.put('/todos/:id', (req, res, next) => {
  let taskId = req.params.id;
  let updatedTask = req.body;
  list.forEach(element => {
    if (element.id === taskId) {
      element.description = updatedTask.todo.description;
      res.send(' task updated successfully');
    }
  });
  writeFile(list);
});

app.delete('/todos/:id', (req, res) => {
  let taskId = req.params.id;
  let index = list.findIndex(element => element.id == taskId);
  list.splice(index, 1);
  res.send('deleted task of index ' + index + ' successfully');
  writeFile(list);
});

app.get('/todos/:id', (req, res) => {
  let taskId = req.params.id;
  list.forEach(element => {
    if (element.id === taskId) {
      res.send(element);
    }
  });
});

app.delete('/todos', (req, res) => {
  list = [];
  writeFile(list);
  res.send('delete all todos');
});

app.post('/todos/:id/done', (req, res) => {
  let taskId = req.params.id;
  list.forEach(element => {
    if (element.id === taskId) {
      element.done = true;
      res.send('task marked as done');
    }
  });
  writeFile(list);
});

app.delete('/todos/:id/done', (req, res) => {
  let taskId = req.params.id;
  list.forEach(element => {
    if (element.id === taskId && element.done === true) {
      element.done = false;
      res.send('task marked as not done');
    }
  });
  writeFile(list);
});

app.listen('3000');
console.log('listening to port 3000');
