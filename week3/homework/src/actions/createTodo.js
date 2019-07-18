'use strict';

async function createTodo(todo, request, response) {
  try {
    const _todo = request.body;
    const error = new Error('');

    if (request.headers['content-type'] !== 'application/json') {
      error.message = 'Please set header content type as application/json';
      error.code = 400;
      throw error;
    }

    if (_todo.text == null || _todo.text.length === 0) {
      error.message = 'Please provide todo text';
      error.code = 400;
      throw error;
    }

    _todo.text = _todo.text.trim();

    const newTodo = await todo.createSave(_todo.text);
    response.status(201);
    response.json({ todo: newTodo });
  } catch ({ message, error }) {
    response.status(400);
    response.json({ error: message });
  }
}

module.exports = createTodo;
