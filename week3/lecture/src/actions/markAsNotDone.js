'use strict';

const deserializeTodo = require('./deserializeTodo');

function markAsNotDone(todo, request, response) {
  const id = request.params.id;
  let done;
  done = false;
  return todo
    .updateDoneToFalse(id, done)
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
