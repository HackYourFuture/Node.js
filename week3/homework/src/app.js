'use strict';

const express = require('express');
const app = express();
const utilities = require('./utilities');

/* before dealing with the endpoints:  parse the request body */
app.use(express.json());

// ( 0 )
app.all('/', (req, res) => {
  res.status(200).json({ testExpress: 'Express is working!' });
});

// ( 1 )
app.post('/todos', (req, res) => utilities.createToDo(req, res));

// ( 2 )
app.get('/todos', (req, res) => utilities.showToDos(req, res));

// ( 3 )
app.put('/todos/:id', (req, res) => utilities.updateToDo(req, res));

// ( 4 )
app.delete('/todos/:id', (req, res) => utilities.deleteToDo(req, res));

// ( 5 )
app.get('/todos/:id', (req, res) => utilities.readToDo(req, res));

// ( 6 )
app.delete('/todos', (req, res) => utilities.deleteToDos(req, res));

// ( 7 )
app.post('/todos/:id/done', (req, res) => utilities.modifyToDoStatus(req, res, true));

// ( 8 )
app.delete('/todos/:id/done', (req, res) => utilities.modifyToDoStatus(req, res, false));

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
