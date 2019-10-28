const deserializeTodo = require('../../../lecture/src/actions/deserializeTodo');

function markAsNotDone(todo, request, response) {
  deserializeTodo(request, response)
    .then(({ done }) => {
      const id = request.params.id;
      return todo.updateDoneAsFalse(id, done);
    })
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
