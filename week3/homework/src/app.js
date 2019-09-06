'use strict';

const dataDealer = require('./data/data_dealer');
const read = dataDealer.read;
const write = dataDealer.write;
const shortid = require('shortid');
const TodoItem = require('./todo_obj_constructor');
const express = require('express');
const app = express();
const utilities = require('./utilities');
const validation = utilities.validation;

/* before dealing with the endpoints:  parse the request body */
app.use(express.json());

// ( 0 )
app.all('/', (req, res) => {
  res.status(200).json({ testExpress: 'Express is working!' });
});
// -------
const findToDo = function(CurrentList, reqId) {
  let toDo = CurrentList.find(todo => todo.id === reqId);
  if (toDo === undefined) {
    throw new Error(`The To-Do item with ID:${reqId} is already not existed`);
  }
  return toDo;
};
// ( 1 )

app.post('/todos', (req, res) => {
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
});

// ( 2 )
app.get('/todos', (req, res) => {
  read('./data/todolist.json', 'utf8')
    .then(result => res.status(200).send(result))
    .catch(err => res.status(404).json({ Error: err.message, catchLocation: 'app.get: /todos' }));
});

// ( 3 )

app.put('/todos/:id', (req, res) => {
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
});

// ( 4 )

app.delete('/todos/:id', (req, res) => {
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
});

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
      const wantedTodo = CurrentList.find(todo => todo.id === reqId);
      if (wantedTodo === undefined) {
        throw new Error(`There is No To-Do item with ID:${reqId}`);
      }
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
      const wantedTodo = CurrentList.find(todo => todo.id === reqId);
      if (wantedTodo === undefined) {
        throw new Error(`There is No To-Do item with ID:${reqId}`);
      }
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
