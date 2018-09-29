'use strict';

function clearTodoList(todo, request, response) {
  todo.ClearFile()
    .then(() => {
      response.status(204);
      response.end();
    })
    .catch(({ message }) => {
      response.status(500);
      response.json({ error: message });
    });
};

module.exports = clearTodoList;
