'use strict';

function markAsNotDone(todo, request, response) {
  const id = request.params.id;
  const done = request.params.done;

  todo
    .markAs(id, done, 'DELETE')
    .then(todo => {
      response.status(200);
      response.json({ todo });
      response.end();
    })
    .catch(({ message, code }) => {
      response.status(code === undefined ? 500 : code);
      response.json({ error: message });
    });
}

module.exports = markAsNotDone;
