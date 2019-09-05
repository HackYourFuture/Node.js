'use strict';

const dataDealer = require('./data/data_dealer');
const read = dataDealer.read;
const write = dataDealer.write;
const shortid = require('shortid');
const TodoItem = require('./todo_obj_constructor');
const express = require('express');
const app = express();

/* before dealing with the endpoints:  parse the request body */
app.use(express.json());

// ( 0 )
app.all('/', (req, res) => {
  res.status(200).json({ testExpress: 'Express is working!' });
});

// ( 1 )
app.post('/todos', (req, res) => {
  const postedTodo = req.body.todo.description;
  const todoObject = new TodoItem(shortid.generate(), postedTodo, false);
  read('./data/todolist.json', 'utf8')
    .then(result => {
      const CurrentList = JSON.parse(result);
      CurrentList.push(todoObject);
      const updatedList = JSON.stringify(CurrentList);
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
  const postedId = req.params.id;
  const postedTodo = req.body.todo.description;

  read('./data/todolist.json', 'utf8')
    .then(result => {
      const CurrentList = JSON.parse(result);
      const wantedTodo = CurrentList.find(todo => todo.id === postedId);
      if (wantedTodo === undefined) {
        throw new Error(`There is No To-Do item with ID:${postedId}`);
      }
      wantedTodo.description = postedTodo;
      write('./data/todolist.json', JSON.stringify(CurrentList));
      res.status(200).json({ Notification: 'The To-Do item is modified' });
    })
    .catch(err =>
      res.status(404).json({
        Error: err.message,
        catchLocation: 'app.post:/todos/:id'
      })
    );
});

// ( 4 )
app.delete('/todos/:id', (req, res) => {
  const postedId = req.params.id;
  read('./data/todolist.json', 'utf8')
    .then(result => {
      const CurrentList = JSON.parse(result);
      const wantedTodo = CurrentList.find(todo => todo.id === postedId);
      if (wantedTodo === undefined) {
        throw new Error(`The To-Do item with ID:${postedId} is already not existed`);
      }
      const updatedList = CurrentList.filter(todo => todo !== wantedTodo);
      write('./data/todolist.json', JSON.stringify(updatedList));
      res.status(200).json({ Notification: `The To-Do item with ID: ${postedId} is deleted` });
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
  const postedId = req.params.id;
  read('./data/todolist.json', 'utf8')
    .then(result => {
      const CurrentList = JSON.parse(result);
      const wantedTodo = CurrentList.find(todo => todo.id === postedId);
      if (wantedTodo === undefined) {
        throw new Error(`There is NO To-Do item with ID:${postedId}`);
      }
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
        catchLocation: 'app.get: /todos/:id'
      });
    });
});

// ( 7 )
app.post('/todos/:id/done', (req, res) => {
  const postedId = req.params.id;

  read('./data/todolist.json', 'utf8')
    .then(result => {
      const CurrentList = JSON.parse(result);
      const wantedTodo = CurrentList.find(todo => todo.id === postedId);
      if (wantedTodo === undefined) {
        throw new Error(`There is No To-Do item with ID:${postedId}`);
      }
      wantedTodo.done = true;
      write('./data/todolist.json', JSON.stringify(CurrentList));
      res.status(200).json({ Notification: 'The To-Do item is modified as DONE' });
    })
    .catch(err =>
      res.status(404).json({
        Error: err.message,
        catchLocation: 'app.post:/todos/:id'
      })
    );

  // res.status(200).json({
  //   testExpress: 'post method: mark a single TO-Do as done.',
  //   id: req.params.id
  // });
});

// ( 8 )
app.delete('/todos/:id/done', (req, res) => {
  res.status(200).json({
    testExpress: 'post method: mark a single TO-Do as NOT done.',
    id: req.params.id
  });
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
