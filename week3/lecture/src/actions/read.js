'use strict';

function read(todo, request, response) {
  todo.read()
    .then(todos => {
      response.json({todos});
      response.end();
    })
    // We are ignoring the actual error
    .catch(error => {
      console.error(error);

      response.status(500);
      response.json({ error: 'Internal Server Error' });
    });
};

module.exports = read;
