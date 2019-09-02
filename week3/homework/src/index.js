const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const getList = require('./getList');
const getToDo = require('./getTodo');
const deleteAll = require('./deleteAll');
const deleteOne = require('./deleteOne');
const addOne = require('./addToDo');
const markDone = require('./markDone');
const editToDo = require('./editToDo');

app.use(express.json());
app.use(bodyParser.json());

app.post('/todo', (req, res) => {
  const toWrite = req.body.description;
  addOne(req, res, toWrite);
});

app.get('/todo', (req, res) => {
  getList(req, res);
});

app.get('/todo/:id', (req, res) => {
  getToDo(req, res, req.params.id);
});

app.delete('/todos', (req, res) => {
  deleteAll(req, res);
});

app.delete('/todo/:id', (req, res) => {
  deleteOne(req, res, req.params.id);
});

app.put('/todoDone/:id', (req, res) => {
  markDone(req, res, req.params.id);
});

app.put('/todo/edit/:id', (req, res) => {
  const toEdit = req.body.description;
  editToDo(req, res, toEdit, req.params.id);
});

const port = 5055;
app.listen(port, () => {
  console.log('server is listening to ' + port);
});
