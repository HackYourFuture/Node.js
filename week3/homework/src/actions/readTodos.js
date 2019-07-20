'use strict';

async function readTodos(todo, request, response) {
  try {
    const id = request.params.id;

    const todos = await todo.read(id);
    if (todos === null) {
      const err = new Error();
      err.message = 'No json file found';
      err.code = 404;
      throw err;
    }

    response.send(todos);
    response.end();
  }
  catch ({ message, code }) {
    response.status(code);
    response.json({ error: message });
  }
}

module.exports = readTodos;
