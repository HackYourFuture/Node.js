'use strict';

async function updateTodo(todo, request, response) {
  try {
    const id = request.params.id;
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

    if (_todo.text == null || _todo.text.length === 0) {
      error.message = 'Please provide todo text';
      error.code = 400;
      throw error;
    }

    if (_todo.text != null) _todo.text = _todo.text.trim();

    const newTodo = await todo.update(id, _todo.text);
    response.status(200);
    response.json(newTodo);
  } catch ({ message, code }) {
    response.status(code);
    response.json({ error: message });
  }
}

module.exports = updateTodo;
