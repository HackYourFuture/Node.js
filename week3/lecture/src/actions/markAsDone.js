'use strict';

const deserializeTodo = require('./deserializeTodo');

function markAsDone(todo, request, response) {
  const id = request.params.id;
  const done = true;
  return todo
    .updateDoneToTrue(id, done)
    .then(todo => {
      response.status(200);
      response.json({ todo });
    })
    .catch(({ message, code }) => {
      response.status(code === 'not-found' ? 404 : 500);
      response.json({ error: message });
    });
}

module.exports = markAsDone;
