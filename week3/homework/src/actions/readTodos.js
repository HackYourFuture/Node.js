'use strict';

function readTodos(todo, req, res) {
  todo
    .read()
    .then(todos => {
      res.json({ todos });
      res.end();
    })
    .catch(({ message }) => {
      res.status(500);
      res.json({ error: message });
    });
}

module.exports = readTodos;
