'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const read = require('./list');
const remove = require('./remove');
const { setTrue, setFalse } = require('./update');
const app = express();
app.use(express.json());
app.use(bodyParser.json());

const Actions = require('./actions');

const action = new Actions('todoList.json');

// Get a single to-do with ID :id
app.get('/todo/:id', read.bind(null, action));

// Clears the list of to-dos
app.delete('/todo', remove.bind(null, action));

// Sets the done flag of a single to-do to true
app.post('/todo/:id/done', setTrue.bind(null, action));

// Sets the done flag of a single to-do to false
app.delete('/todo/:id/done', setFalse.bind(null, action));

// another way
// app.delete('/todo/:id/done', (request, response) => {
//   action.update(request, response, false);
// });

const port = 3000;
app.listen(port, () => {
  console.log(`you are listening to port ${port}`);
});
