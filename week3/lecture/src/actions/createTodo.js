'use strict';

const deserializeTodo = require('./deserializeTodo');

function createTodo(todo, request, response) {
  deserializeTodo(request, response)
    .then(({ description }) => todo.create(description))
    .then(todo => {
      response.status(201);
      response.json({ todo });
    })
    .catch(({ message }) => {
      response.status(500);
      response.json({ error: message });
    });
};

module.exports = createTodo;
