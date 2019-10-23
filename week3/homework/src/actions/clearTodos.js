'use strict';

async function clearTodos(todo, req, res) {
  try {
    await todo._save([]);
    res.status(201).send({ Succeeded: 'Obliterated all todo items >=3' });
  } catch (error) {
    res.status(404).send({ error: '404 Not found :(' });
  }
}

module.exports = clearTodos;
