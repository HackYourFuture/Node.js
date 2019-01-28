'use strict';

const fs = require('fs');
const readAndParseTodos = require('./readAndparse');
const validateTodo = require('./validateTodo');

const update = (newTodo, newDone, req, res, ) => {
  const parsedTodos = readAndParseTodos();
  const todoUpdate = parsedTodos.find(td => td.id === req.params.id);
  const index = parsedTodos.indexOf(todoUpdate)
  const {
    error
  } = validateTodo(req.body); // with object destructor  result.error ====>{error}
  if (error) return res.status(400).send(error.details[0].message);
  todoUpdate.done = newDone;
  todoUpdate.todo = newTodo;
  parsedTodos.splice(index, 1, todoUpdate)
  const restItems = JSON.stringify(parsedTodos);
  fs.writeFileSync('todos.json', restItems);
  return todoUpdate;
};

module.exports = update;