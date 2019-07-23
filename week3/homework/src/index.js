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

app.post('/addTodo', (req, res) => {
  const toWrite = req.body.todo.description;
  addOne(req, res, toWrite);
});

app.get('/todos', (req, res) => {
  getList(req, res);
});

app.get('/todo/?', (req, res) => {
  const id = req.query.id;
  getToDo(req, res, id);
});

app.delete('/todos', (req, res) => {
  deleteAll(req, res);
});

app.put('/todo/?', (req, res) => {
  deleteOne(req, res, req.query.id);
});

app.put('/todoDone/?', (req, res) => {
  markDone(req, res, req.query.id);
});

app.put('/todo/edit/?', (req, res) => {
  const toEdit = req.body.todo.description;
  editToDo(req, res, toEdit, req.query.id);
});

const port = 5055;
app.listen(port, () => {
  console.log('server is listening to ' + port);
});
