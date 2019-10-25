'use strict';

{
  function clearTodos(todo, request, response) {
    todo
      .deleteTodos()
      .then(() => {
        response.json({ message: 'list cleared' });
        response.status(204);
        response.end();
      })
      .catch(({ message }) => {
        response.status(500);
        response.json({ error: message });
      });
  }

  module.exports = clearTodos;
}
