'use strict';

function clearTodos(todo, request, response) {
  todo
    .clearAll()
    .then(() => {
      response.status(204);
      response.end();
    })
    .catch(({ message }) => {
      response.status(500);
      response.json({ error: message });
    });
}

module.exports = clearTodos;
