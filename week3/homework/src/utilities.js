'use strict';

const dataDealer = require('./data/data_dealer');
const read = dataDealer.read;
const write = dataDealer.write;
const shortid = require('shortid');
const TodoItem = require('./todo_obj_constructor');

const validation = function(req) {
  const reqBodyLength = Object.keys(req.body).length;
  const reqToDo = req.body.todo || {};
  let reqDescription = reqToDo.description || {};

  if (typeof reqDescription === 'string') {
    reqDescription = reqDescription.trim();
  }

  if (
    reqBodyLength !== 1 ||
        reqDescription === {} ||
        typeof reqDescription !== 'string' ||
        reqDescription.length === 0
  ) {
    return (reqDescription = '');
  }
  return reqDescription;
};

const findToDo = function(CurrentList, reqId) {
  let toDo = CurrentList.find(todo => todo.id === reqId);
  if (toDo === undefined) {
    throw new Error(`The To-Do item with ID:${reqId} is already not existed`);
  }
  return toDo;
};

const createToDo = function(req, res) {
  const toDoDescription = validation(req);
  if (toDoDescription === '') {
    res.status(200).json({ Notification: 'The posted To-Do is not valid' });
    return;
  }
  const todoObject = new TodoItem(shortid.generate(), toDoDescription, false);
  read('./data/todolist.json', 'utf8')
    .then(result => {
      const CurrentList = JSON.parse(result);
      CurrentList.push(todoObject);
      const updatedList = JSON.stringify(CurrentList, null, 2);
      write('./data/todolist.json', updatedList);
      res.status(200).json({ Notification: 'new To-DO is added' });
    })
    .catch(err =>
      res.status(404).json({
        Error: err.message,
        catchLocation: 'app.post:/todos'
      })
    );
};

const getToDos = function(req, res) {
  read('./data/todolist.json', 'utf8')
    .then(result => res.status(200).send(result))
    .catch(err => res.status(404).json({ Error: err.message, catchLocation: 'app.get: /todos' }));
};

const updateToDo = function(req, res) {
  const reqId = req.params.id;
  const toDoDescription = validation(req);
  if (toDoDescription === '') {
    res.status(200).json({ Notification: 'The posted To-Do is not valid' });
    return;
  }
  read('./data/todolist.json', 'utf8')
    .then(result => {
      const CurrentList = JSON.parse(result);
      const wantedTodo = findToDo(CurrentList, reqId);
      wantedTodo.description = toDoDescription;
      write('./data/todolist.json', JSON.stringify(CurrentList, null, 2));
      res.status(200).json({ Notification: 'The To-Do item is modified' });
    })
    .catch(err =>
      res.status(404).json({
        Error: err.message,
        catchLocation: 'app.put:/todos/:id'
      })
    );
};

const deleteToDo = function(req, res) {
  {
    const reqId = req.params.id;
    read('./data/todolist.json', 'utf8')
      .then(result => {
        const CurrentList = JSON.parse(result);
        const wantedTodo = findToDo(CurrentList, reqId);
        const updatedList = CurrentList.filter(todo => todo !== wantedTodo);
        write('./data/todolist.json', JSON.stringify(updatedList, null, 2));
        res.status(200).json({ Notification: `The To-Do item with ID: ${reqId} is deleted` });
      })
      .catch(err =>
        res.status(404).json({
          Error: err.message,
          catchLocation: 'app.delete:/todos/:id'
        })
      );
  }
};

const readToDo = function(req, res) {
  const reqId = req.params.id;
  read('./data/todolist.json', 'utf8')
    .then(result => {
      const CurrentList = JSON.parse(result);
      const wantedTodo = findToDo(CurrentList, reqId);
      res.status(200).json(wantedTodo);
    })
    .catch(err =>
      res.status(404).json({
        Error: err.message,
        catchLocation: 'app.get: /todos/:id'
      })
    );
};
const deleteToDos = function(req, res) {
  write('./data/todolist.json', JSON.stringify([]))
    .then(res.status(200).json({ Notification: 'All the To-Do items are deleted.' }))
    .catch(err => {
      console.log('errrrr');
      res.status(404).json({
        Error: err.message,
        catchLocation: 'app.delete: /todos'
      });
    });
};
const markAsDone = function(req, res) {
  const reqId = req.params.id;
  read('./data/todolist.json', 'utf8')
    .then(result => {
      const CurrentList = JSON.parse(result);
      const wantedTodo = findToDo(CurrentList, reqId);
      wantedTodo.done = true;
      write('./data/todolist.json', JSON.stringify(CurrentList, null, 2));
      res
        .status(200)
        .json({ Notification: `The To-Do item with ID: ${reqId} is modified as Done` });
    })
    .catch(err =>
      res.status(404).json({
        Error: err.message,
        catchLocation: 'app.post:/todos/:id/done'
      })
    );
};
const markAsNotDone = function(req, res) {
  const reqId = req.params.id;
  read('./data/todolist.json', 'utf8')
    .then(result => {
      const CurrentList = JSON.parse(result);
      const wantedTodo = findToDo(CurrentList, reqId);
      wantedTodo.done = false;
      write('./data/todolist.json', JSON.stringify(CurrentList, null, 2));
      res
        .status(200)
        .json({ Notification: `The To-Do item with ID: ${reqId} is modified as NOT done` });
    })
    .catch(err =>
      res.status(404).json({
        Error: err.message,
        catchLocation: 'app.delete:/todos/:id/done'
      })
    );
};
module.exports = {
  validation,
  findToDo,
  createToDo,
  getToDos,
  updateToDo,
  deleteToDo,
  readToDo,
  deleteToDos,
  markAsDone,
  markAsNotDone
};
