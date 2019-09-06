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

module.exports = { validation, findToDo, createToDo, getToDos };
