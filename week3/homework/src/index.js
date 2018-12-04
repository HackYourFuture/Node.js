'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require("fs");
const uuid = require('uuid/v4');
const todos = require('./tasks.json');


app.use(bodyParser());

function checkID(req) {
  const id = req.params.id;
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === id) {
      return id;
    }
  }
  return false;
}

app.post('/toDos', function (req, res) {
  todos.push({ task: req.body.todo.description, id: uuid(), done: false });
  let newJsonData = JSON.stringify(todos);
  fs.writeFileSync('./tasks.json', newJsonData);
  res.send("Adding successful");
});

app.get('/toDos', function (req, res) {
  res.send(todos);
});

app.put('/todos/:id', function (req, res) {
  const id = checkID(req);
  if (id !== false) {
    const UpDateDetails = req.body.todo.description;
    todos.forEach(item => {
      if (item.id === id) {
        item.task = UpDateDetails;
      }
    });
    let newJsonData = JSON.stringify(todos);
    fs.writeFileSync('tasks.json', newJsonData);
    res.send("Update is successful");
  }
  else {
    res.send("Check your id please");
  }
});

app.delete('/todos/:id', function (req, res) {
  const id = checkID(req);
  if (id !== false) {
    const itemsNotDeleted = todos.filter(item => item.id !== id);
    let newJsonData = JSON.stringify(itemsNotDeleted);
    fs.writeFileSync('tasks.json', newJsonData);
    res.send("Delete is successful");
  }
  else {
    res.send("Check your id please");
  }
});

//Assignment

app.get('/todos/:id', function (req, res) {
  const id = checkID(req);
  if (id !== false) {
    const getByIdItem = todos.filter(item => item.id === id);
    res.send(getByIdItem);
  }
  else {
    res.send("Check your id please");
  }
});

app.post('/todos/:id/done', function (req, res) {
  const id = checkID(req);
  if (id !== false) {
    todos.forEach(item => {
      if (item.id === id) {
        item.done = true;
      }
    });
    let newJsonData = JSON.stringify(todos);
    fs.writeFileSync('tasks.json', newJsonData);
    res.send("Mark As Done is successful");
  }
  else {
    res.send("Check your id please");
  }
});

app.delete('/todos/:id/done', function (req, res) {
  const id = checkID(req);
  if (id !== false) {
    todos.forEach(item => {
      if (item.id === id) {
        item.done = false;
      }
    });
    let newJsonData = JSON.stringify(todos);
    fs.writeFileSync('tasks.json', newJsonData);
    res.send("Mark As Not Done is successful ");
  }

  else {
    res.send("Check your id please");
  }
});

app.delete('/todos', function (req, res) {
  todos.splice(0, todos.length);
  let newJsonData = JSON.stringify(todos);
  fs.writeFileSync('tasks.json', newJsonData);
  res.send("clear is successful");
});


app.listen(3000); 
