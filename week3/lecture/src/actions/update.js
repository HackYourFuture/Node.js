'use strict';

const deserializeTodo = require('./deserializeTodo');

function update(todo, request, response) {
  const id    = request.params.id;
  const _todo = deserializeTodo(request, response);

  if (_todo == null) {
    return;
  }

  todo.update(id, _todo.description)
    .then(todo => {
      response.status(200);
      response.json({ todo });
    })
    .catch(error => {
      console.error(error);

      if (error.code === 'not-found') {
        response.status(404);
        response.json({ error: error.message });
        return;
      }

      response.status(500);
      response.json({ error: 'Internal Server Error' });
    });
};

module.exports = update;
