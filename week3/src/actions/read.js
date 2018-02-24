'use strict';

function read(todo, request, response) {
  todo.read()
    .then(todos => {
      response.json({todos});
      response.end();
    })
    // We are ignoring the actual error
    .catch(error => {
      response.status(500);
      response.json({ error });
    });
};

module.exports = read;
