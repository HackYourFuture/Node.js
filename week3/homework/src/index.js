'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const {
  addToList,
  removeFromList,
  stringifyAndWrite,
  readF,
  markUnDone,
  markDone,
  readSingleToDo,
  updateList,
} = require('./actions.js');

const app = express();
app.use(bodyParser.json());

app.get('/todos', (req, res) => {
  res.send(readF());
});

app.get('/todos/:id', (req, res) => {
  const id = req.params.id;
  res.send(readSingleToDo(id));
});

app.post('/todos', (req, res) => {
  addToList(req.body.todo.description);
  res.send(readF());
});

app.post('/todos/:id/:action', (req, res) => {
  const id = req.params.id;
  if (req.params.action === 'done') {
    const returnedValue = markDone(id);
    if (returnedValue === undefined) {
      res.send(readF());
    } else {
      res.send(returnedValue);
    }
  }
});

app.put('/todos/:id', (req, res) => {
  const id = req.params.id;
  const returnedValue = updateList(id, req.body.todo.description);
  if (returnedValue === undefined) {
    res.send(readF());
  } else {
    res.send(returnedValue);
  }
});

app.delete('/todos/:id', (req, res) => {
  const id = req.params.id;
  const returnedValue = removeFromList(id);
  if (returnedValue === undefined) {
    res.send(readF());
  } else {
    res.send(returnedValue);
  }
});

app.delete('/todos', (req, res) => {
  stringifyAndWrite([]);
  res.send(readF());
});

app.delete('/todos/:id/:action', (req, res) => {
  const id = req.params.id;
  if (req.params.action === 'done') {
    const returnedValue = markUnDone(id);
    if (returnedValue === undefined) {
      res.send(readF());
    } else {
      res.send(returnedValue);
    }
  }
});

app.listen(3000);
