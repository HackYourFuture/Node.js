'use strict';
const readAndParseTodos = require('./readAndparse');
const parsedTodosList = readAndParseTodos();

let list = (_req, res) => {
  if (parsedTodosList.length === 0)
    return `${res.statusCode} :the todolist is empty`;
  return parsedTodosList;
}

module.exports = list;