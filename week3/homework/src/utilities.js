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
    throw new Error(`The To-Do item with ID:${reqId} is not existed`);
  }
  return toDo;
};

const createToDo = function(req, res) {
  const toDoDescription = validation(req);
  if (toDoDescription === '') {
    res.status(202).json({ Notification: 'The posted To-Do is not valid' });
    return;
  }
  const todoObject = new TodoItem(shortid.generate(), toDoDescription, false);
  read('./data/todolist.json', 'utf8')
    .then(result => {
      const CurrentList = JSON.parse(result);
      CurrentList.push(todoObject);
      const updatedList = JSON.stringify(CurrentList, null, 2);
      write('./data/todolist.json', updatedList);
      res.status(201).json({ Notification: 'new To-DO is added' });
    })
    .catch(err => res.status(500).json({ Error: err.message }));
};

const showToDos = function(req, res) {
  read('./data/todolist.json', 'utf8')
    .then(result => {
      if (result === '[]') {
        res.status(202).json({ Notification: 'The ToDo list is empty!' });
        return;
      }
      res.status(200).send(result);
    })
    .catch(err => res.status(500).json({ Error: err.message }));
};

const updateToDo = function(req, res) {
  const reqId = req.params.id;
  const toDoDescription = validation(req);
  if (toDoDescription === '') {
    res.status(202).json({ Notification: 'The posted To-Do is not valid' });
    return;
  }
  read('./data/todolist.json', 'utf8')
    .then(result => {
      const CurrentList = JSON.parse(result);
      const wantedTodo = findToDo(CurrentList, reqId);
      wantedTodo.description = toDoDescription;
      write('./data/todolist.json', JSON.stringify(CurrentList, null, 2));
      res.status(201).json({ Notification: 'The To-Do item is modified' });
    })
    .catch(err => res.status(500).json({ Error: err.message }));
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
        res.status(201).json({ Notification: `The To-Do item with ID: ${reqId} is deleted` });
      })
      .catch(err => res.status(500).json({ Error: err.message }));
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
    .catch(err => res.status(500).json({ Error: err.message }));
};

const deleteToDos = function(req, res) {
  write('./data/todolist.json', JSON.stringify([]))
    .then(res.status(201).json({ Notification: 'All the To-Do items are deleted.' }))
    .catch(err => res.status(500).json({ Error: err.message }));
};

const modifyToDoStatus = function(req, res, boolean) {
  const reqId = req.params.id;
  read('./data/todolist.json', 'utf8')
    .then(result => {
      const CurrentList = JSON.parse(result);
      const wantedTodo = findToDo(CurrentList, reqId);
      wantedTodo.done = boolean;
      const todoStatus = wantedTodo.done === true ? 'Done' : 'Not Done';
      write('./data/todolist.json', JSON.stringify(CurrentList, null, 2));
      res
        .status(201)
        .json({ Notification: `The To-Do item with ID: ${reqId} is modified as ${todoStatus}.` });
    })
    .catch(err => res.status(500).json({ Error: err.message }));
};

module.exports = {
  createToDo,
  showToDos,
  updateToDo,
  deleteToDo,
  readToDo,
  deleteToDos,
  modifyToDoStatus
};
