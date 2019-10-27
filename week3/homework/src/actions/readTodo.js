'use strict'
const getData = require('./getData')

async function readTodo(req, res) {
    const todos = await getData();
    const todo = todos.find(TODO => TODO.id === req.params.id);
    res.send(todo);
  }

  module.exports = readTodo;