/* eslint-disable no-constant-condition */
'use strict';

const fs = require('fs');
const readAndParseTodos = require('./readAndparse');

let removeOne = (req, res) => {
  const parsedTodos = readAndParseTodos();
  const todoDelete = parsedTodos.find(tD => tD.id === req.params.id);
  if (!todoDelete) {
    return res.status(404).send(`${res.statusCode} :the todo with the id:${ req.params.id} was not found`);
  }
  const index = parsedTodos.indexOf(todoDelete);
  const deleted = parsedTodos.splice(index, 1)
  const stringfiedTodos = JSON.stringify(parsedTodos);
  fs.writeFileSync('todos.json', stringfiedTodos);
  return deleted;
}

module.exports = removeOne;