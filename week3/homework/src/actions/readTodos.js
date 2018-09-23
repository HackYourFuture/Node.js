'use strict';

function readTodos(todo, request, response) {
  const id = request.params.id;
  todo.readin(id)
    .then(todos => {
      console.log(todos)
      response.json({ todos });
      response.end();
    })
    .catch(({ message }) => {
      response.status(500);
      response.json({ error: message });
    });
};

module.exports = readTodos;
