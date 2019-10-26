'use strict';

function deleteTodos(todo, request, response) {
  todo
    .deleteTodos()
    .then(() => {
      response.status(204);
      response.end();
    })
    .catch(({ message }) => {
      response.status(500);
      response.json({ error: message });
    });
}

module.exports = deleteTodos;
