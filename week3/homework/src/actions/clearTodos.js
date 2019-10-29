'use strict';

function clearTodos(todo, response) {
  todo
    .deleteTodos()
    .then(() => {
      response.end();
    })
    .catch(({ message }) => {
      response.status(500);
      response.json({ error: message });
    });
}

module.exports = clearTodos;
