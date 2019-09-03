'use strict';

const dataDealer = require('./data/data_dealer');
const read = dataDealer.read;
const write = dataDealer.write;

//  handling endpoints/routing with express

const express = require('express');
const app = express();
/* before dealing with the endpints:  parse the request body */
app.use(express.json());

// ( 0 )
app.all('/', (req, res, next) => {
  res.status(200).json({ testExpress: 'Express is working!' });
});

// ( 1 )
app.post('/todos', (req, res, next) => {
  const newTodo = req.body.todo.description;

  const newToDoObjet = {
    id: '99',
    description: newTodo,
    done: false
  };

  read('./data/todolist.json', 'utf8')
    .then(result => {
      const CurrentList = JSON.parse(result);
      CurrentList.push(newToDoObjet);
      const updatedList = JSON.stringify(CurrentList);
      write('./data/todolist.json', updatedList);
      console.log(updatedList);
      res.status(200).json({ Notification: 'new To-DO is added' });
    })
    .catch(err => res.status(404).json({ Error: err.message }));
});

// ( 2 )
app.get('/todos', (req, res, next) => {
  read('./data/todolist.json', 'utf8')
    .then(result => res.status(200).send(result))
    .catch(err => res.status(404).json({ Error: err.message }));
});

// ( 3 )
app.put('/todos/:id', (req, res, next) => {
  res.status(200).json({
    testExpress: 'Put method: update the description of a single To-Do with ID :id.',
    id: req.params.id
  });
});

// ( 4 )
app.delete('/todos/:id', (req, res, next) => {
  res.status(200).json({
    testExpress: 'delete method: delete a single To-Do from the list with ID :id.',
    id: req.params.id
  });
});

// ( 5 )
app.get('/todos/:id', (req, res, next) => {
  res.status(200).json({
    testExpress: 'get method: get a single To-Do from the list with ID :id.',
    id: req.params.id
  });
});

// ( 6 )
app.delete('/todos', (req, res, next) => {
  res.status(200).json({
    testExpress: 'delete method: clear the To-Do list.',
    id: req.params.id
  });
});

// ( 7 )
app.post('/todos/:id/done', (req, res, next) => {
  res.status(200).json({
    testExpress: 'post method: mark a single TO-Do as done.',
    id: req.params.id
  });
});

// ( 8 )
app.delete('/todos/:id/done', (req, res, next) => {
  res.status(200).json({
    testExpress: 'post method: mark a single TO-Do as NOT done.',
    id: req.params.id
  });
});

//  errors: json parse on the body of the request, and invalid endpoints
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
