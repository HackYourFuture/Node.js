'use strict'

const express = require('express');
const todoMethodList = require('./index');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser());

const port = 3000;
app.get('/todos', (req, res) => {
  res.send(todoMethodList.readToDoFile());
});
app.get('/todos/:id', (req, res) => {
  res.send(todoMethodList.readToDoFile(req.params.id));//todoMethodList[0](req.params.id));
});

app.post('/todos', (req, res) => {//ADD
  const msg = todoMethodList.addToDoFromHTML(req.body.todo);//[1](req.body.todo);
  res.send(msg);
});

app.post('/todos/:id/done', (req, res) => {//MarkAsDone
  const msg = todoMethodList.upDateDone(req.params.id);//[4](req.params.id);
  res.send(msg);
});

app.put('/todos/:id', (req, res) => {//Update
  const msg = todoMethodList.updateToDoFromHTML(req.params.id, req.body.todo);//[2](req.params.id, req.body.todo);
  res.send(msg);
});

app.delete('/todos', (req, res) => {//Delete
  const msg = todoMethodList.deleteToDoFromHTML();//[3]();
  res.send(msg);
});

app.delete('/todos/:id', (req, res) => {
  const msg = todoMethodList.deleteToDoFromHTML(req.params.id);//[3](req.params.id);
  res.send(msg);
});

app.delete('/todos/:id/done', (req, res) => {//MarkAsNotDone
  const msg = todoMethodList.upDateNotDone(req.params.id);//[5](req.params.id);
  res.send(msg);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

/*GET=read
POST
PUT=update
DELETE */

