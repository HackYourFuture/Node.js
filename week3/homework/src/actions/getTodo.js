'use strict';

function getTodo(todo, request, response) {
  const id = request.params.id;

  todo.get(id)
    .then(todo => {
      response.json({ todo });
      response.end();
    })
    .catch(({ message }) => {
      response.status(500);
      response.json({ error: message });
    });
};

module.exports = getTodo;
