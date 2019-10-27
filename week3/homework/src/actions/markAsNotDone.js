'use strict'
const getData = require('./getData');
const newFile = require('./newFile')

async function markAsNotDone(req, res) {
    const todos = await getData();
    const todo = todos.find(TODO => TODO.id === req.params.id);
    todo.done = false;
    await newFile(todos);
    res.status = 201;
    res.end('not done');
  }

  module.exports = markAsNotDone;