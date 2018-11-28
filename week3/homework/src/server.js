'use strict'

const express = require('express');
const todoMethodList = require('./index');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser());

const port = 3000;
app.get('/todos', (req, res) => {
  res.send(todoMethodList[0]());
});
app.get('/todos/:id', (req, res) => {
  res.send(todoMethodList[0](req.params.id));
});

app.post('/todos', (req, res) => {
  todoMethodList[1](req.body.todo);
  res.send('ok');
});

app.post('/todos/:id/done', (req, res) => {//MarkAsDone
  todoMethodList[4](req.params.id);
  res.send('ok');
});

app.put('/todos/:id', (req, res) => {
  todoMethodList[2](req.params.id, req.body.todo);
  res.send('ok');
});

app.delete('/todos', (req, res) => {
  todoMethodList[3]();
  res.send("ok");
});

app.delete('/todos/:id', (req, res) => {
  todoMethodList[3](req.params.id);
  res.send('ok');
});

app.delete('/todos/:id/done', (req, res) => {//MarkAsNotDone
  todoMethodList[5](req.params.id);
  res.send('ok');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

/*GET=read
POST
PUT=update
DELETE */

