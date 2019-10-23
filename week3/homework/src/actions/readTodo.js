'use strict';

async function readTodo(todo, req, res) {
  try {
    const todoList = await todo.readList().then(todoList => JSON.parse(todoList));
    const index = parseInt(req.params.id);
    if (index > 0 && index <= todoList.length) {
      res.status(200).send(todoList[index - 1]);
    } else {
      res.status(400).send({ Failed: 'Please provide a valid id ' });
    }
  } catch (error) {
    res.status(404).send({ error: '404 Not Found :(' });
  }
}

module.exports = readTodo;
