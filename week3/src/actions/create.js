'use strict';

const deserializeTodo = require('./deserializeTodo');

function create(todo, request, response) {
  const _todo = deserializeTodo(request, response);

  if (_todo == null)
    return;

  todo.create(_todo.description)
    .then(todo => {
      response.status(201);
      response.json({ todo });
    })
    .catch(error => {
      console.error(error);

      response.status(500);
      response.json({ error: 'Internal Server Error' });
    });
};

module.exports = create;
