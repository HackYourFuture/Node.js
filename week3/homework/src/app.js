'use strict';

const dataDealer = require('./data/data_dealer');
const read = dataDealer.read;
const write = dataDealer.write;
// const shortid = require('shortid');
// const TodoItem = require('./todo_obj_constructor');
const express = require('express');
const app = express();
const utilities = require('./utilities');
// const validation = utilities.validation;
const findToDo = utilities.findToDo;

/* before dealing with the endpoints:  parse the request body */
app.use(express.json());

// ( 0 )
app.all('/', (req, res) => {
  res.status(200).json({ testExpress: 'Express is working!' });
});

// ( 1 )
app.post('/todos', (req, res) => utilities.createToDo(req, res));

// ( 2 )
app.get('/todos', (req, res) => utilities.getToDos(req, res));

// ( 3 )
app.put('/todos/:id', (req, res) => utilities.updateToDo(req, res));

// ( 4 )
app.delete('/todos/:id', (req, res) => utilities.deleteToDo(req, res));

// ( 5 )
app.get('/todos/:id', (req, res) => {
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
});

// ( 6 )
app.delete('/todos', (req, res) => {
  write('./data/todolist.json', JSON.stringify([]))
    .then(res.status(200).json({ Notification: 'All the To-Do items are deleted.' }))
    .catch(err => {
      console.log('errrrr');
      res.status(404).json({
        Error: err.message,
        catchLocation: 'app.delete: /todos'
      });
    });
});

// ( 7 )
app.post('/todos/:id/done', (req, res) => {
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
});

// ( 8 )
app.delete('/todos/:id/done', (req, res) => {
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
});

// errors handling: JSON parse & stringify, and invalid endpoints
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
      catchLocation: 'app.use: haldeling errors section'
    }
  });
});

module.exports = app;
