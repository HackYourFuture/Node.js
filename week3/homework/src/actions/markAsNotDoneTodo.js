'use strict';

function markAsNotDoneTodo(todo, request, response) {
  const id = request.params.id;

  todo.setDone(id, false)
    .then(() => {
      response.status(200);
      response.end();
    })
    .catch(({ message }) => {
      response.status(500);
      response.json({ error: message });
    });
};

module.exports = markAsNotDoneTodo;
