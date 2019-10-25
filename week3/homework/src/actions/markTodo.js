'use strict';

{
  function markTodo(todo, doneValue, request, response) {
    const id = request.params.id;
    todo
      .readTodo(id)
      .then(({ done }) => {
        done = doneValue;
        return todo.markTodo(id, done);
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

  module.exports = markTodo;
}
