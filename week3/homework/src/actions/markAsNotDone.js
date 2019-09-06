'use strict';

const deserializeTodo = require('./deserializeTodo');

function markAsNotDone(todo, request, response) {
  deserializeTodo(request, response)
    .then(() => {
      const id = request.params.id;
      return todo.notDone(id);
    })
    .then(todo => {
      response.status(200);
      response.json({ todo });
    })
    .catch(({ message, code }) => {
      response.status(code === 'not-found' ? 404 : 500);
      response.json({ error: message });
    });
}

module.exports = markAsNotDone;
