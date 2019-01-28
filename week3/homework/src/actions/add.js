'use strict';

const fs = require('fs');
const readAndParseTodos = require('./readAndparse');
const validateTodo = require('./validateTodo')
const uuidv1 = require('uuid/v1');

let add = (todo, req, res) => {
  const parsedTodos = readAndParseTodos();
  const {
    error
  } = validateTodo(req.body); // with object destructor  result.error ====>{error}
  if (error) return res.status(400).send(error.details[0].message);
  const addedTodo = {
    id: uuidv1(),
    todo: todo
  };
  parsedTodos.push(addedTodo)
  const stringifiedTodos = JSON.stringify(parsedTodos)
  fs.writeFileSync('todos.json', stringifiedTodos);
  return addedTodo;
};

module.exports = add;