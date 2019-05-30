'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const { list, reset, update } = require('./actions');
const app = express();
app.use(express.json());
app.use(bodyParser.json());

// Get a single to-do with ID :id
app.get('/todo/:id', async (request, response) => {
  try {
    let todoList = await list();
    // get a specific element
    todoList = JSON.parse(todoList);
    const index = parseInt(request.params.id);
    if (index > 0 && index <= todoList.length) {
      response.status(200).send(todoList[index - 1]);
    } else {
      response.status(404).send({ error: 'invalid id number' });
    }
  } catch {
    response.status(404).send({ error: 'there is an error' });
  }
});

// Clears the list of to-dos
app.delete('/todo', async (request, response) => {
  try {
    await reset([]);
    response.status(201).send('the whole content of JSON file has been deleted');
  } catch (err) {
    response.status(404).send(err);
  }
});

// instead of calling list(read) and reset(write) each time, i used update function to prevent repeating code.

// Sets the done flag of a single to-do to true
app.post('/todo/:id/done', (request, response) => {
  update(request, response, true);
});

// Sets the done flag of a single to-do to false
app.delete('/todo/:id/done', (request, response) => {
  update(request, response, false);
});

const port = 3000;
app.listen(port, () => {
  console.log(`you are listening to port ${port}`);
});
